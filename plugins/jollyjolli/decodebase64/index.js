const decodeBase64  = require('./decodeBase64')

module.exports = {
        pkgJson: require('./package.json'),
        load: [],
        commands: {
            pre: [],
            post: [],
        },
        events: [],
        functions: [decodeBase64],
    }