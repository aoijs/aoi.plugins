const fs = require('fs');
const path = require('path');
const { logUserPlugins } = require('./functionLoaded');

class UserPlugins {
    constructor(args) {
        this.args = args;
        if (!args.bot) {
            console.log('You have not inputted your AoiClient! Exiting Code!');
            process.exit(0);
        }
    }

    loadUserPlugins(pluginFolderPath) {
        const bot = this.args.bot;
        const pluginsPath = path.resolve(__dirname, '..', '..', pluginFolderPath);

        try {
            const pluginFiles = fs.readdirSync(pluginsPath);

            pluginFiles.forEach((file) => {
                const plugin = require(path.join(pluginsPath, file));
                bot.functionManager.createFunction(plugin);
            });

            const enabledPlugins = pluginFiles.map((file) => `$${path.parse(file).name}`);
            logUserPlugins(enabledPlugins); // Call the logUserPlugins function from functionLoaded.js
        } catch (error) {
            console.error('Error loading user plugins:', error);
        }
    }
}

module.exports = { UserPlugins };