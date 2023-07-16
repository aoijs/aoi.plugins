const fs = require('fs');
const path = require('path');
const { logEnabledPlugins } = require('../core/functionLoaded');

class Plugins {
    constructor(args) {
        this.args = args;
        if (!args.bot) {
            console.log('You have not inputted your AoiClient! Exiting Code!');
            process.exit(0);
        }
    }

    loadPlugins(enabledPlugins) {
        const bot = this.args.bot;
        const pluginsPath = path.join(__dirname, '../plugins');
        const pluginFiles = fs.readdirSync(pluginsPath);

        pluginFiles.forEach(file => {
            const plugin = require(path.join(pluginsPath, file));

            // Extract the plugin name from the file name (remove the file extension)
            const pluginName = path.parse(file).name;

            if (!enabledPlugins || enabledPlugins.includes(`$${pluginName}`)) {
                bot.functionManager.createFunction(plugin);
            }
        });

        // Call logEnabledPlugins function to log the enabled plugins at the end of the method
        logEnabledPlugins(enabledPlugins);
    }
}

module.exports = { Plugins };
