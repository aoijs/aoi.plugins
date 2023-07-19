module.exports = {
    name: '$arch',
    type: 'djs',
    author: "dodoGames",
    version: "6.4.0",
    description: "Returns the current system architecture the host/OS is using.",
    example: "Will return x64, arm, arm64, ppc, etc depending on the current system architecture used",
    code: async d => {
        const data = d.util.aoiFunc(d);
        data.result = process.arch;
        return {
            code: d.util.setCode(data)
        };
    }
};
