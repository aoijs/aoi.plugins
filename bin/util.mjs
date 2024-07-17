export const getPluginUrl = async (username, plugin) =>
    `https://raw.githubusercontent.com/aoijs/aoi.plugins/main/plugins/${username}/${plugin}/._bundle.js`;
