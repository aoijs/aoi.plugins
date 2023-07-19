const djsversion = require( "./djsversion.js" );

module.exports = {
    pkgJson: require("./package.json"),
    load: [],
    commands: {
        pre: [],
        post: [],
    },
    events: [],
    functions: [djsversion],
};
