module.exports = {
    name: '$djsversion',
    type: 'djs',
    author: "dodoGames",
    version: ["6.4.0"],
    description: "Returns the current discord.js version the bot is using",
    example: "Will return 14.11.0 as a example",
    code: async d => {
        const data = d.util.aoiFunc(d);
        
        const { version } = require("discord.js")
      data.result = version;
        return {
            code: d.util.setCode(data)
        };
    }
};
