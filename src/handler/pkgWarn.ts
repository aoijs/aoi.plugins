import path from 'path';

export default async function pkgWarn() {
    try {
        // Construct the path to the package's package.json
        const packageJsonPath = path.resolve(__dirname, '..', '..', 'package.json');

        // Import the package.json
        const pack = require(packageJsonPath);

        const version = pack.version as string;

        const res = await fetch("https://registry.npmjs.org/aoi.js-library", {
            headers: {
                "User-Agent": "aoi.js-library",
            },
        });

        const data = await res.json();
        const latestVersion = data["dist-tags"].latest as string;
        const isDevVersion = version.includes("dev");

        if (!isDevVersion && version !== latestVersion) {
            console.warn(
                `\x1b[31mAoiLibrary:\x1B[0m ${pack.name} is outdated! Update with "npm install ${pack.name}@latest".`,
            );
        } else if (isDevVersion) {
            console.warn(
                "\x1b[31mAoiLibrary:\x1B[0m You are currently on a development version.",
            );
        }
    } catch (error) {
        console.warn(
            `\x1b[31mAoiLibrary:\x1B[0m Failed to check for updates: ${error}`,
        );
    }
}
