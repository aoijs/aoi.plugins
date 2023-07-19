const fs = require('fs');
const path = require('path');
const { logEnabledPlugins } = require('../handler/functionLoaded');

class Plugins {
    constructor(args) {
        this.args = args;
        if (!args.bot) {
            console.log('You have not inputted your AoiClient! Exiting Code!');
            process.exit(0);
        }
    }

    resolvePluginPath(pluginName) {
        const pluginParts = pluginName.split('/');
        const pluginFolder = pluginParts[0];
        const pluginFile = pluginParts[1] || 'index';

        const pluginsPath = path.join(__dirname, '..', 'plugins');
        const pluginPath = path.join(pluginsPath, pluginFolder, `${pluginFile}.js`);

        if (fs.existsSync(pluginPath)) {
            return pluginPath;
        }

        return null;
    }

    loadPluginFile(pluginPath) {
        try {
            const plugin = require(pluginPath);
            this.args.bot.functionManager.createFunction(plugin);
        } catch (error) {
            console.error(`Failed to load plugin: ${pluginPath}`);
            console.error(error);
        }
    }

    loadPlugins(enabledPlugins) {
        if (!enabledPlugins || (Array.isArray(enabledPlugins) && enabledPlugins.length === 0)) {
            throw new Error('You must provide at least one enabled plugin in the loadPlugins function.');
        }

        const bot = this.args.bot;
        const pluginsPath = path.join(__dirname, '..', 'plugins');

        const processPlugin = (pluginName) => {
            const [author, plugin] = pluginName.split('/'); // Splitting author and plugin name
            const prefixedPluginName = `$${plugin}`;

            const pluginPath = this.resolvePluginPath(`${author}/${plugin}`);
            if (pluginPath) {
                this.loadPluginFile(pluginPath);
            } else {
                console.error(`Could not find plugin: ${pluginName}`);
            }
        };

        if (Array.isArray(enabledPlugins)) {
            enabledPlugins.forEach(processPlugin);
        } else {
            processPlugin(enabledPlugins);
        }

        // Call the logEnabledPlugins function from functionLoaded.js
        logEnabledPlugins(enabledPlugins, pluginsPath);
    }
}

module.exports = { Plugins };
