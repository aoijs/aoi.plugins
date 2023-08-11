"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
async function pkgWarn() {
    const packageJsonPath = path_1.default.resolve(process.cwd(), 'package.json');
    const pack = require(packageJsonPath);
    const version = pack.version;
    try {
        const res = await fetch("https://registry.npmjs.org/aoi.js-library", {
            headers: {
                "User-Agent": "aoi.js-library",
            },
        });
        const data = await res.json();
        const latestVersion = data["dist-tags"].latest;
        const isDevVersion = version.includes("dev");
        if (!isDevVersion && version !== latestVersion) {
            console.warn(`\x1b[31mAoiLibrary:\x1B[0m ${pack.name} is outdated! Update with "npm install ${pack.name}@latest".`);
        }
        else if (isDevVersion) {
            console.warn("\x1b[31mAoiLibrary:\x1B[0m You are currently on a development version.");
        }
    }
    catch (error) {
        console.warn(`\x1b[31mAoiLibrary:\x1B[0m Failed to check for updates: ${error}`);
    }
}
exports.default = pkgWarn;
