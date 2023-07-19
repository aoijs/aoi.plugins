const arch = require( "./arch.js" );

module.exports = {
    pkgJson: require("./package.json"),
    load: [],
    commands: {
        pre: [],
        post: [],
    },
    events: [],
    functions: [arch],
};
