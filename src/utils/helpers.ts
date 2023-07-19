export const getPluginUrl = async (username: string, plugin: string) =>
    `https://raw.githubusercontent.com/Leref/aoi.js-library/main/plugins/${username}/${plugin}/._bundle.js`;