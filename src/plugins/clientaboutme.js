module.exports = {
    name: '$clientaboutme',
    type: 'djs',
    code: async d => {
        const data = d.util.aoiFunc(d);
        data.result = d.client.application.description;
        return {
            code: d.util.setCode(data)
        };
    }
};
