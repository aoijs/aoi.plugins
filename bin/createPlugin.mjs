import fs from "fs";
import { promisify } from "util";
import { exec } from "child_process";
import path from "path";
import ora from "ora";
import chalk from "chalk";
export default async function createPlugin(dir) {
    const spinnerData = {
        spinner: "dots",
        color: "cyan",
    };
    const projectDir = path.join(process.cwd(), "plugins", dir.toLowerCase());
    const authorPath = path.join(
        process.cwd(),
        "plugins",
        dir.toLowerCase().split("/")[0],
    );

    if (!fs.existsSync(authorPath)) {
        fs.mkdirSync(authorPath);
    }
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir);
    }
    const spinner = ora(spinnerData);
    //creating package.json
    spinner.start();
    if (!fs.existsSync(path.join(projectDir, "package.json"))) {
        spinner.text = chalk.hex("#A64253")("Creating package.json...");
        await fs.promises.writeFile(
            path.join(projectDir, "package.json"),
            `{ 
    "name": "@${dir.toLowerCase()}",
    "version": "1.0.0"
}`,
        );
        spinner.succeed(chalk.hex("#A64253")("Created package.json!"));
    }
    spinner.text = chalk.hex("#A64253")("Installing dependencies...");
    const packagesToInstall = [];
    if(packagesToInstall.length) {
        const { stderr, stdout } = await promisify(exec)(
            `npm i ${packagesToInstall.join(" ")}`,
            {
             cwd: projectDir,
            },
        );
    if (stderr) {
        console.log(stderr);
        process.exit(1);
    }
    console.log(stdout);
    spinner.succeed(chalk.hex("#A64253")("Installed dependencies!"));
}

    const spinner2 = ora(spinnerData);
    spinner2.text = chalk.hex("#A64253")("Creating index.js");
    await fs.promises.writeFile(path.join(projectDir, "index.js"),`module.exports = {
        pkgJson: require('./package.json'),
        load: [],
        commands: {
            pre: [],
            post: [],
        },
        events: [],
        functions: [],
    }`);
    spinner2.succeed(chalk.hex("#A64253")("Created project files!"));
}
