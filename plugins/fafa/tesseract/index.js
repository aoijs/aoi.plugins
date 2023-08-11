const advancedSplitText = require('./tesseract')

module.exports = {
        pkgJson: require('./package.json'),
        load: [],
        commands: {
            pre: [],
            post: [],
        },
        events: [],
        functions: [tesseract],
    }