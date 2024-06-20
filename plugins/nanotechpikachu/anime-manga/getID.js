module.exports = {
    name: "$getID",
    type: "djs", 
    author: "NanotechPikachu",
    version: ["6.6.1"], 
    description: "Returns the ID of anime/manga passed as per in MAL",
    example: "$getID[sword art online;manga] // returns sword art online manga ID as in MAL",
    code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err);
    
    const [name, type = 'Anime'] = data.inside.splits;

    const Jikan = require('jikan4.js');
    const JIKAN_CLIENT = new Jikan.Client();

    if (!name) {
        return d.aoiError.fnError(d, "custom", {}, "Anime/Manga name not specified");
    }
    if (!type) return d.aoiError.fnError(d, "custom", {}, "Type not specified.")
    let searchResults;
    let foundID;
    const ty = type.toLowerCase().trim();
    const n = name.trim();
    
    if (ty != 'anime' && ty != 'manga') {
        return d.aoiError.fnError(d, "custom", {}, "Invalid type specified. Either Manga / Anime only");
    }
    
    switch (ty) {
        case 'anime':
            searchResults = await JIKAN_CLIENT.anime.search(n);
            break; 
        case 'manga': 
            searchResults = await JIKAN_CLIENT.manga.search(n);
            break; 
    }
    const quarterLength = Math.ceil(searchResults.length / 4);

    for (let i = 0; i < quarterLength; i++) {
        const result = searchResults[i].title.default.toLowerCase();

        if (n === result) {
                foundID = searchResults[i].id;
        } else {
            foundID = searchResults[0].id;
        }
    }

    if (!foundID) {
        foundID = "ANFError";
    }
    
    data.result = foundID;
    return {
        code: d.util.setCode(data),
        
    };
  }
}
