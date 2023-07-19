const fs = require('fs');
const path = require('path');
require('./packageWarning')();

const colorize = (text, colorCode) => `\u001b[${colorCode}m${text}\u001b[0m`;

const getVersionFromPluginFile = (pluginPath) => {
    try {
        const plugin = require(pluginPath);
        return plugin.version || 'Unknown';
    } catch (error) {
        return 'Unknown';
    }
};

const logEnabledPlugins = (enabledPlugins, pluginsPath) => {
    console.log(colorize('--- Plugins Loaded ---', '1;33;4')); // Yellow, Bold, Underline

    if (Array.isArray(enabledPlugins)) {
        enabledPlugins.forEach((pluginName) => {
            const [, author, plugin] = pluginName.match(/^\$?(.*?)(?:\/(.+))?$/);

            const pluginDisplayName = colorize(`Plugin Name: $${plugin}`, '33'); // Yellow
            const authorDisplay = colorize(`Plugin Author: ${author || 'default'}`, '33'); // Yellow

            const pluginPath = path.join(pluginsPath, author || 'default', `${plugin}.js`);
            const pluginInfo = require(pluginPath);

            let compatibleVersion = pluginInfo.version || 'Unknown';
            if (Array.isArray(compatibleVersion)) {
                compatibleVersion = compatibleVersion.join(', ');
            }

            const compatibleDisplay = colorize(`Compatible: ${compatibleVersion}`, '33'); // Yellow
            const separatorLine = colorize('----------------------', '90'); // Gray

            console.log(`${pluginDisplayName}`);
            console.log(`${authorDisplay}`);
            console.log(`${compatibleDisplay}`);
            console.log(separatorLine);
        });
    } else {
        console.log('enabledPlugins:', enabledPlugins);
    }
};

const logUserPlugins = (enabledPlugins, userPluginsPath) => {
    console.log(colorize('--- User Plugins Loaded ---', '1;33;4')); // Yellow, Bold, Underline

    enabledPlugins.forEach((pluginName, index) => {
        const pluginDisplayName = colorize(`Plugin Name: ${pluginName}`, '33'); // Yellow
        const separatorLine = colorize('----------------------', '90'); // Gray

        console.log(`${pluginDisplayName}`);
        console.log(separatorLine);
    });
};

const getPluginFiles = (pluginsPath) => {
    const pluginFiles = [];
    const pluginFolders = fs.readdirSync(pluginsPath);

    pluginFolders.forEach((folder) => {
        const folderPath = path.join(pluginsPath, folder);
        const folderStat = fs.statSync(folderPath);

        if (folderStat.isDirectory()) {
            const files = fs.readdirSync(folderPath);
            files.forEach((file) => {
                const pluginPath = path.join(folderPath, file);
                pluginFiles.push(pluginPath);
            });
        } else {
            const pluginPath = path.join(pluginsPath, folder);
            pluginFiles.push(pluginPath);
        }
    });

    return pluginFiles;
};

module.exports = { logEnabledPlugins, logUserPlugins };
