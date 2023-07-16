const fs = require('fs');
const path = require('path');

const colorize = (text, colorCode) => `\u001b[${colorCode}m${text}\u001b[0m`;

const logEnabledPlugins = (enabledPlugins) => {
    const pluginsPath = path.join(__dirname, '../plugins');
    const pluginFiles = fs.readdirSync(pluginsPath);

    console.log(colorize('--- Plugins Loaded ---', '1;33;4')); // Yellow, Bold, Underline
    pluginFiles.forEach((file, index) => {
        const plugin = require(path.join(pluginsPath, file));
        const pluginName = path.parse(file).name;
        const prefixedPluginName = `$${pluginName}`;
        const pluginType = plugin.type;

        if (!enabledPlugins || enabledPlugins.includes(prefixedPluginName)) {
            const pluginIndex = colorize(`[${index + 1}]`, '33'); // Yellow
            const pluginDisplayName = colorize(`Plugin Name: ${prefixedPluginName}`, '33'); // Yellow
            const separatorLine = colorize('----------------------', '90'); // Gray

            console.log(`${pluginIndex} ${pluginDisplayName}`);
            console.log(`    Type: ${pluginType}`);
            console.log(separatorLine);
        }
    });
};

const logUserPlugins = (enabledPlugins) => {
    const pluginsPath = path.join(__dirname, '../../plugins');
    const pluginFiles = fs.readdirSync(pluginsPath);

    console.log(colorize('--- User Plugins Loaded ---', '1;33;4')); // Yellow, Bold, Underline
    pluginFiles.forEach((file, index) => {
        const plugin = require(path.join(pluginsPath, file));
        const pluginName = path.parse(file).name;
        const prefixedPluginName = `$${pluginName}`;
        const pluginType = plugin.type;

        if (!enabledPlugins || enabledPlugins.includes(prefixedPluginName)) {
            const pluginIndex = colorize(`[${index + 1}]`, '33'); // Yellow
            const pluginDisplayName = colorize(`Plugin Name: ${prefixedPluginName}`, '33'); // Yellow
            const separatorLine = colorize('----------------------', '90'); // Gray

            console.log(`${pluginIndex} ${pluginDisplayName}`);
            console.log(`    Type: ${pluginType}`);
            console.log(separatorLine);
        }
    });
};

module.exports = { logEnabledPlugins, logUserPlugins };
