module.exports = {
    name: '$os',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        const os = require('os');
        data.result = os.platform();
        return {
            code: d.util.setCode(data)
        };
    }
};
