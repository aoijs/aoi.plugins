const comment = require( "./comment.js" );

module.exports = {
    pkgJson: require("./package.json"),
    load: [],
    commands: {
        pre: [],
        post: [],
    },
    events: [],
    functions: [comment],
};
