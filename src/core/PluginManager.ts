import { AoiClient } from "aoi.js";
import {
    existsSync,
    readFileSync,
    mkdirSync,
    createWriteStream,
} from "node:fs";
import { getPluginUrl } from "../utils/helpers";
import { Readable } from "node:stream";

import { ReadableStream } from "stream/web";
import pkgWarn from "../handler/pkgWarn";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);
export class PluginManager {
    client: AoiClient;
    plugins: Map<any, any>;
    customFunctions: any[] = [];
    loadFunctions: any[] = [];
    eventsFunctions: any[] = [];
    commandsFunctions: {
        pre: any[];
        post: any[];
    }  = {
        pre: [],
        post: [],
    };
    constructor(client: AoiClient) {
        pkgWarn();
        this.client = client;
        this.plugins = new Map();
        // @ts-ignore
        client.pluginManager = this;
        if (!existsSync("node_modules/.aoijs.plugins")) {
            mkdirSync("node_modules/.aoijs.plugins");
        }
    }
    async load() {
        if (!existsSync("aoijs.plugins"))
            throw new Error("Plugin file not found");
        const plugins = readFileSync("aoijs.plugins", "utf-8")
            .split("\n")
            .map((x) => x.trim());

        await this.#load(plugins);
    }
    async #load(plugins: string[]) {
        const pluginData = [];
        for (const plugin of plugins) {
            if (!plugin) continue;
            if (this.#hasPluginCached(plugin)) {
                const p = require(process.cwd() +
                    "/" +
                    `node_modules/.aoijs.plugins/${plugin.replace(
                        "/",
                        "@",
                    )}.js`);
                pluginData.push({
                    error: false,
                    data: p,
                    plugin,
                    message: undefined,
                });
            } else {
                const data = await this.#fetchPlugin(plugin);

                const buffer = data.data;
                const file = data.plugin.replace("/", "@");
                const path = `node_modules/.aoijs.plugins/${file}.js`;

                const writer = createWriteStream(path);
                buffer?.pipe(writer, {
                    end: true,
                });

                writer.on("finish", () => {
                    const plugin = require(process.cwd() + "/" + path);
                    this.plugins.set(data.plugin, plugin);
                    writer.close();

                    const p = require(process.cwd() + "/" + path);
                    data.data = p;
                    pluginData.push(data);
                });
            }
        }
        const chalk = (await import("chalk")).default;
        const boxen = (await import("boxen")).default;

        for(const plugin of pluginData) {
            if(!plugin.error) {
                this.plugins.set(plugin.plugin, plugin.data);
                this.customFunctions.push(...plugin.data.functions);
                this.loadFunctions.push(...plugin.data.load);
                this.eventsFunctions.push(...plugin.data.events);
                this.commandsFunctions.pre.push(...plugin.data.commands.pre);
                this.commandsFunctions.post.push(...plugin.data.commands.post);

                const deps = Object.keys(plugin.data.dependencies ?? {}).map(x => 
                    `${x}@${plugin.data.dependencies[x]}`)
                if(deps.length) {
                    console.log(chalk.blue(`Installing dependencies for ${plugin.plugin}`))
                   await execAsync(`npm i ${deps.join(" ")}`);
                    console.log(chalk.green(`Installed dependencies for ${plugin.plugin}`))
                }
            }
        }

        for (const func of this.customFunctions) {
            this.client.functionManager.createFunction(func)
        }

        const box = boxen(
            chalk.bold("Plugin Manager") +
                "\n" +
                pluginData
                    .map((data) => {
                        if (data.error) {
                            return chalk.red(data.message);
                        } else {
                            return chalk.green(`Loaded plugin: ${data.plugin}`);
                        }
                    })
                    .join("\n"),
            {
                padding: 1,
                margin: 1,
                borderStyle: "round",
                borderColor: "cyan",
                align: "left",
                backgroundColor: "#101010",
                title: "AoiLib",
                float: "left",
            },
        );

        console.log(box);
    }

    async #fetchPlugin(name: string) {
        let [username, plugin] = name.split("/");
        if (!plugin) {
            plugin = username;
            username = "default";
        }

        const url = await getPluginUrl(username, plugin);

        const res = await fetch(url);
        if (!res.ok) {
            return {
                error: true,
                message: `Failed to load plugin: ${username}/${plugin}`,
                plugin: `${username}/${plugin}`,
            };
        } else {
            if (!res.body) {
                return {
                    error: true,
                    message: `Failed to load plugin: ${username}/${plugin}`,
                    plugin: `${username}/${plugin}`,
                };
            }
            return {
                error: false,
                data: Readable.fromWeb(res.body as ReadableStream<any>),
                plugin: `${username}/${plugin}`,
            };
        }
    }

    async loadPlugins(...plugins: string[]) {
        await this.#load(plugins);
    }

    #hasPluginCached(plugin: string) {
        const file = plugin.replace("/", "@");
        const path = `node_modules/.aoijs.plugins/${file}.js`;
        return existsSync(path);
    }
}
