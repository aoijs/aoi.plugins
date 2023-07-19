module.exports = {
    name: '$clientaboutme',
    type: 'djs',
    author: "dodoGames",
    version: "6.4.0",
    description: "Returns the bot about me by returning the application description from developer portal",
    example: "if the application description is test then it will return test upon running the function",
    code: async d => {
        const data = d.util.aoiFunc(d);
        data.result = d.client.application.description;
        return {
            code: d.util.setCode(data)
        };
    }
};
