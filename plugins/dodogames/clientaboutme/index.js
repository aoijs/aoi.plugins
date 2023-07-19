const clientaboutme = require( "./clientaboutme.js" );

module.exports = {
    pkgJson: require("./package.json"),
    load: [],
    commands: {
        pre: [],
        post: [],
    },
    events: [],
    functions: [clientaboutme],
};
