const fetchInvite = require('./fetchinvite.js')

module.exports = {
        pkgJson: require('./package.json'),
        load: [],
        commands: {
            pre: [],
            post: [],
        },
        events: [],
        functions: [fetchInvite],
    }