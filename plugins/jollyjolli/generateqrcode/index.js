const generateQRCode = require('./generateQRCode')

module.exports = {
        pkgJson: require('./package.json'),
        load: [],
        commands: {
            pre: [],
            post: [],
        },
        events: [],
        functions: [generateQRCode],
    }