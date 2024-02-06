"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginManager = void 0;
const node_fs_1 = require("node:fs");
const helpers_1 = require("../utils/helpers");
const node_stream_1 = require("node:stream");
const pkgWarn_1 = __importDefault(require("../handler/pkgWarn"));
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const execAsync = (0, node_util_1.promisify)(node_child_process_1.exec);
class PluginManager {
    client;
    plugins;
    customFunctions = [];
    loadFunctions = [];
    eventsFunctions = [];
    commandsFunctions = {
        pre: [],
        post: [],
    };
    constructor(client) {
        (0, pkgWarn_1.default)();
        this.client = client;
        this.plugins = new Map();
        // @ts-ignore
        client.pluginManager = this;
        if (!(0, node_fs_1.existsSync)("node_modules/.aoijs.plugins")) {
            (0, node_fs_1.mkdirSync)("node_modules/.aoijs.plugins");
        }
    }
    async load() {
        if (!(0, node_fs_1.existsSync)("aoijs.plugins"))
            throw new Error("Plugin file not found");
        const plugins = (0, node_fs_1.readFileSync)("aoijs.plugins", "utf-8")
            .split("\n")
            .map((x) => x.trim());
        await this.#load(plugins);
    }
    async loadPlugins(...plugins) {
        await this.#load(plugins);
    }
    async #load(plugins) {
        const pluginData = [];
        for (const plugin of plugins) {
            if (!plugin)
                continue;
            if (this.#hasPluginCached(plugin)) {
                const p = require(process.cwd() +
                    "/" +
                    `node_modules/.aoijs.plugins/${plugin.replace("/", "@")}.js`);
                pluginData.push({
                    error: false,
                    data: p,
                    plugin,
                    message: undefined,
                });
            }
            else {
                const data = await this.#fetchPlugin(plugin);
                const buffer = data.data;
                const file = data.plugin.replace("/", "@");
                const path = `node_modules/.aoijs.plugins/${file}.js`;
                const writer = (0, node_fs_1.createWriteStream)(path);
                buffer?.pipe(writer, {
                    end: true,
                });
                writer.on("finish", () => {
                    const plugin = require(process.cwd() + "/" + path);
                    this.plugins.set(data.plugin, plugin);
                    writer.close();
                    data.data = require(process.cwd() + "/" + path);
                    pluginData.push(data);
                });
            }
        }
        const chalk = (await import("chalk")).default;
        const boxen = (await import("boxen")).default;
        for (const plugin of pluginData) {
            if (!plugin.error) {
                this.plugins.set(plugin.plugin, plugin.data);
                this.customFunctions.push(...plugin.data.functions);
                this.loadFunctions.push(...plugin.data.load);
                this.eventsFunctions.push(...plugin.data.events);
                this.commandsFunctions.pre.push(...plugin.data.commands.pre);
                this.commandsFunctions.post.push(...plugin.data.commands.post);
                const deps = Object.keys(plugin.data.dependencies ?? {}).map(x => `${x}@${plugin.data.dependencies[x]}`);
                if (deps.length) {
                    console.log(chalk.blue(`Installing dependencies for ${plugin.plugin}`));
                    await execAsync(`npm i ${deps.join(" ")}`);
                    console.log(chalk.green(`Installed dependencies for ${plugin.plugin}`));
                }
            }
        }
        for (const func of this.customFunctions) {
            this.client.functionManager.createFunction(func);
        }
        const box = boxen(chalk.bold("Plugin Manager") +
            "\n" +
            pluginData
                .map((data) => {
                if (data.error) {
                    return chalk.red(data.message);
                }
                else {
                    return chalk.green(`Loaded plugin: ${data.plugin}`);
                }
            })
                .join("\n"), {
            padding: 1,
            margin: 1,
            borderStyle: "round",
            borderColor: "cyan",
            align: "left",
            backgroundColor: "#101010",
            title: "AoiLib",
            float: "left",
        });
        console.log(box);
    }
    async #fetchPlugin(name) {
        let [username, plugin] = name.split("/");
        if (!plugin) {
            plugin = username;
            username = "default";
        }
        const url = await (0, helpers_1.getPluginUrl)(username, plugin);
        const res = await fetch(url);
        if (!res.ok) {
            return {
                error: true,
                message: `Failed to load plugin: ${username}/${plugin}`,
                plugin: `${username}/${plugin}`,
            };
        }
        else {
            if (!res.body) {
                return {
                    error: true,
                    message: `Failed to load plugin: ${username}/${plugin}`,
                    plugin: `${username}/${plugin}`,
                };
            }
            return {
                error: false,
                data: node_stream_1.Readable.fromWeb(res.body),
                plugin: `${username}/${plugin}`,
            };
        }
    }
    #hasPluginCached(plugin) {
        const file = plugin.replace("/", "@");
        const path = `node_modules/.aoijs.plugins/${file}.js`;
        return (0, node_fs_1.existsSync)(path);
    }
}
exports.PluginManager = PluginManager;
