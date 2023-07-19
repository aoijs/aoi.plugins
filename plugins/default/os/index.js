const os = require( "./os.js" );

module.exports = {
    pkgJson: require("./package.json"),
    load: [],
    commands: {
        pre: [],
        post: [],
    },
    events: [],
    functions: [os],
};
