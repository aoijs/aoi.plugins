const advancedSplitText = require('./advancedSplitText')

module.exports = {
        pkgJson: require('./package.json'),
        load: [],
        commands: {
            pre: [],
            post: [],
        },
        events: [],
        functions: [advancedSplitText],
    }