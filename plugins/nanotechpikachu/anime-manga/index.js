const getID = require('./getID.js');
const animeInfo = require('./animeInfo.js');
const animeCharInfo = require('./animeCharacterInfo.js');
const mangaInfo = require('./mangaInfo.js');
const mangaCharInfo = require('./mangaCharacterInfo.js');

module.exports = {
        pkgJson: require('./package.json'),
        load: [],
        commands: {
            pre: [],
            post: [],
        },
        events: [],
        functions: [getID, mangaInfo, mangaCharInfo, animeInfo, animeCharInfo],
    }
