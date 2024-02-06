export const getPluginUrl = async (username: string, plugin: string) =>
    `https://raw.githubusercontent.com/AkaruiDevelopment/aoi.plugins/main/plugins/${username}/${plugin}/._bundle.js`;