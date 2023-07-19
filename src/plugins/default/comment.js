module.exports = {
    name: '$comment',
    type: 'djs',
    author: "default",
    version: "6.4.0",
    description: "To comment in a code",
    example: "$comment[This is a comment, it will not be executed]",
    code: async d => {
        const data = d.util.aoiFunc(d);
        const [text] = data.inside.splits;
        if (!text) return d.aoiError.fnError(d, 'custom', {}, 'No Text was Provided');
        // Nothing here, it's a comment
        return {
            code: d.util.setCode(data)
        };
    }
};
