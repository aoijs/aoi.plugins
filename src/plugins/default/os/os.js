module.exports = {
    name: '$os',
    type: 'djs',
    author: "default",
    version: "6.4.0",
    description: "Returns the OS of the system",
    example: "The OS of the system is $os",
    code: async d => {
        const data = d.util.aoiFunc(d);
        const os = require('src/plugins/default/os/os');
        data.result = os.platform();
        return {
            code: d.util.setCode(data)
        };
    }
};
