#! /usr/bin/env node
/* eslint-disable indent */

import chalk from "chalk";
import boxen from "boxen";
import path from "path";
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import * as esbuild from "esbuild";
import createPlugin from "./createPlugin.mjs";
import { getPluginUrl } from "./util.mjs";
const pack = JSON.parse(
    readFileSync(path.join(process.cwd(), "./package.json"), "utf-8"),
);
const argv = process.argv.slice(2).map((x) => x.trim());

const name = argv.shift() || "";
if (!name) {
    const msgbox = boxen(
        chalk.cyanBright(
            `
                   .:^^:.                
                 .:~JJ~:.               
                .:~YGBY~:.              
               .:~YPG#GJ~:.             
              .:~JPPGGBGJ^:.            
             .:^JPP555PGP?^:.    ...           ${chalk.hex("#A64253")(
                 "Aoi.js",
             )} 
            ..:^75GGGGGPGP7^:.^:.   :.    
           .:^5?^7PBBGGPGG57^:...  .^          ${chalk.hex("#9721A9")(
               "Version: " + pack.version,
           )}
          .:^5@&?^?PBGGPPGB5!:.   :^.   
         .:^5@@@&?^?PPPPGGBBY!::::.            ${chalk.hex("#8700FF")(
             `Author: ${pack.author}`,
         )}
       ..:^5@@&&@&7^?PGPBBGBGY7^.       
    .. .::Y&&&@&&@#!^?PGGGPPBBY~:.      
   .^  .:J&&&&&&&@#!^!Y###BBB#BJ^:.     
   .~::^J#BB#B#&@#J!^^~JB######BJ^:.    
     :^J#B#BB#BBB7:. .:~J#######G?^:.   
    .:7BGGGGGGGB7:.   .:~JB###BGBP7^:.  
   .:7#BGGGGGGB7:.     .:~YB&#BPGG57^:. 
  .:!B&#BBBBBB7:.       .:~YBBBPGPGY!^. 
  .:~7!!~~~~~^:.         .:^~~~~~~!!~:.



`,
        ),
        {
            padding: 1,
            margin: 1,
            borderStyle: "round",
            borderColor: "cyan",
            align: "left",
            backgroundColor: "#101010",
            title: "Aoi.js",
            float: "center",
            fullscreen: true,
            height: "50%",
        },
    );

    console.log(msgbox);
} else if (name === "help" || name === "-h" || name === "--help") {
    const cmds = {
        help: {
            desc: "Shows this message",
            aliases: ["-h", "--help"],
            usage: "aoilib [help | -h | --help]",
        },
        version: {
            desc: "Shows the version of AoiBun",
            aliases: ["-v", "--version"],
            usage: "aoilib [version | -v | --version]",
        },
        create: {
            desc: "Creates a new aoi.js plugin setup",
            aliases: ["-c", "--create"],
            usage: "aoilib [create | -c | --create] <dir>",
        },
        bundle: {
            desc: "Bundles the project into a single file",
            aliases: ["-b", "--bundle"],
            usage: "aoilib [bundle | -b | --bundle] <dir>",
        },
        add: {
            desc: "Adds a plugin to the project",
            aliases: [],
            usage: "aoilib add <plugin>",
        },
    };
    const msgbox = boxen(
        Object.entries(cmds)
            .map(
                ([cmd, desc]) =>
                    `${chalk.hex("#8700FF")(cmd.padEnd(10, " "))} ${chalk.hex(
                        "#9721A9",
                    )(desc.aliases.join(" ").padEnd(15, " "))} ${chalk.hex(
                        "#A64253",
                    )(desc.desc.padEnd(45, " "))} ${chalk
                        .hex("#00FFF0")(desc.usage)
                        .padEnd(10, " ")}`,
            )
            .join("\n"),
        {
            padding: 1,
            margin: 1,
            borderStyle: "round",
            borderColor: "cyan",
            align: "left",
            backgroundColor: "#101010",
            title: "AoiLib",
            float: "center",
            fullscreen: true,
            height: "100%",
        },
    );

    console.log(msgbox);
} else if (name === "-v" || name === "--version") {
    console.log(chalk.hex("#A64253")(pack.version));
} else if (name === "create" || name === "-c" || name === "--create") {
    const dir = argv.filter((x) => !x.startsWith("--"))[0];
    if (!dir) {
        console.log(chalk.hex("#A64253")("Please specify a directory!"));
        process.exit(1);
    }

    createPlugin(dir);
} else if (name === "bundle" || name === "-b" || name === "--bundle") {
    const dir = argv.filter((x) => !x.startsWith("--"))[0];
    if (!dir) {
        console.log(chalk.hex("#A64253")("Please specify a directory!"));
        process.exit(1);
    }
    const pkgJson = JSON.parse(
        readFileSync(`${process.cwd()}/plugins/${dir}/package.json`, "utf-8"),
    );
    const options = {
        entryPoints: [`plugins/${dir}/index.js`],
        bundle: true,
        platform: "node",
        target: ["node18"],
        outfile: `plugins/${dir}/._bundle.js`,
        external: [
            ...Object.keys(pkgJson.dependencies || {}),
            ...Object.keys(pkgJson.devDependencies || {}),
        ],
    };
    console.log(chalk.hex("#A64253")("Bundling..."));
    console.log(options);
    await esbuild.build(options);

    console.log(chalk.hex("#A64253")("Bundled!"));
} else if (name === "add") {
    let plugins = argv.filter((x) => !x.startsWith("--"));
    const isForced = argv.includes("--force");

    if (!plugins.length) {
        console.log(chalk.hex("#A64253")("Please specify a plugin!"));
        process.exit(1);
    }
    plugins = plugins.map((x) => {
        const plugin = x.trim();
        const [username, pluginName] = plugin.split("/");
        if (!pluginName) {
            pluginName = username;
            username = "default";
        }

        return {
            username,
            pluginName,
        };
    });

    for (const plugin of plugins) {
        if (!existsSync(process.cwd() + "/aoijs.plugins")) {
            writeFileSync(process.cwd() + "/aoijs.plugins", "");
        }

        if (
            readFileSync(process.cwd() + "/aoijs.plugins", "utf-8")
                .split("\n")
                .includes(plugin) &&
            !isForced
        ) {
            console.log(chalk.hex("#A64253")("Plugin already exists!"));
            process.exit(1);
        }

        const pluginUrl = await getPluginUrl(
            plugin.username,
            plugin.pluginName,
        );
        const pluginFullName = `${plugin.username}/${plugin.pluginName}`;
        const pluginData = await fetch(pluginUrl).then((res) => res.text());
        writeFileSync(
            process.cwd() +
                `/node_modules/.aoijs.plugins/${pluginFullName.replace("/", "@")}.js`,
            pluginData,
        );
        appendFileSync(process.cwd() + "/aoijs.plugins", pluginFullName + "\n");
    }
    console.log(chalk.hex("#A64253")("Added plugin!"));
} else if (name === "remove") {
    const loadPlugins = argv.filter((x) => !x.startsWith("--"))

    if (!loadPlugins.length) {
        console.log(chalk.hex("#A64253")("Please specify a plugin!"));
        process.exit(1);
    }

    if(!existsSync(process.cwd() + "/aoijs.plugins")) {
        console.log(chalk.hex("#A64253")("No plugins to remove!"));
        process.exit(1);
    }

    const plugins = readFileSync(process.cwd() + "/aoijs.plugins", "utf-8")
        .split("\n")
        .filter((x) => !loadPlugins.includes(x));
    
    writeFileSync(process.cwd() + "/aoijs.plugins", plugins.join("\n"));

    if(!existsSync(process.cwd() + "/node_modules/.aoijs.plugins")) {
        console.log(chalk.hex("#A64253")("No plugins to remove!"));
        process.exit(1);
    }

    for(const plugin of loadPlugins) {
        const [username, pluginName] = plugin.split("/");
        if (!pluginName) {
            pluginName = username;
            username = "default";
        }

        const file = plugin.replace("/", "@");
        const path = `node_modules/.aoijs.plugins/${file}.js`;
        unlinkSync(path);
    }

    console.log(chalk.hex("#A64253")("Removed plugin!"));
} else {
    console.log(chalk.hex("#A64253")("Unknown command!"));
    process.exit(1);
}
