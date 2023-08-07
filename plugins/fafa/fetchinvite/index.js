const fetchInvite = require('./fetchInvite.js')

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