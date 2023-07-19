module.exports = {
    name: '$djsversion',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        
        const { version } = require("discord.js")
      data.result = version;
        return {
            code: d.util.setCode(data)
        };
    }
};
