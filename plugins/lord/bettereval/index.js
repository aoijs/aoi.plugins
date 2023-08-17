let eval = require("./eval.js");

module.exports = {
        pkgJson: require('./package.json'),
        load: [],
        commands: {
            pre: [],
            post: [],
        },
        events: [],
        functions: [eval],
    }