module.exports = {
    name: '$comment',
    type: 'djs',
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
