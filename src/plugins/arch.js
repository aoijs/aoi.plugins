module.exports = {
    name: '$arch',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        data.result = process.arch;
        return {
            code: d.util.setCode(data)
        };
    }
};
