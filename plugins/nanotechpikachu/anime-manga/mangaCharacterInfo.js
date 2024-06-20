module.exports = {
    name: "$mangaCharInfo",
    type: "djs", 
    author: "NanotechPikachu",
    version: ["6.6.1"], 
    description: "Returns the character info of the character and manga ID passed.",
    example: "$mangaCharInfo[$getID[the eminence in shadow;manga];Cid;image] // returns the eminence in shadow's Cid's image.",
    code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err); 
    
    const [mangaID, character, res] = data.inside.splits;

    //some imports and functions
    const Jikan = require('jikan4.js');
    const JIKAN_CLIENT = new Jikan.Client();

    function getFirstName(characterName, databaseNames) {
      let res = false;
      const nameParts = databaseNames.split(',').map(part => part.trim().toLowerCase());
      if (nameParts.includes(characterName.toLowerCase())) {
          res = true;
      };
      return res;
  };

  function getDescription(characterDescription) {
      let description;

      if (!characterDescription) {
          return description = 'Description not found.';
      } else {
          if (characterDescription.length > 1024) {
              const midPoint = characterDescription.lastIndexOf('.', 1024);

              if (midPoint !== -1) {
                  const descriptionFirstPart = characterDescription.substring(0, midPoint + 1);
                  description = descriptionFirstPart;
              }
          } else {
              description = characterDescription
          }
      }
      return description;
  }
      // functions end

    if (!mangaID) return d.aoiError.fnError(d, "custom", {}, "Anime ID not provided.");
    if (!character) return d.aoiError.fnError(d, "custom", {}, "Character not provided.");
    if (!res) return d.aoiError.fnError(d, "custom", {}, "Enter the result type.")
    
    const mID = mangaID.trim();
    const characterName = character.trim().toLowerCase();
    const resu = res.trim().toLowerCase();
    
    const type = ["name", "url", , "image", "nicknames", "role", "description", "manga"];
    
    if (!type.includes(resu)) return d.aoiError.fnError(d, "custom", {}, "Invalid result type entered.")
    
    const manga = await JIKAN_CLIENT.manga.get(mID);
    if (!manga) return d.aoiError.fnError(d, "custom", {}, "Manga not found.");
    
    const ch = await JIKAN_CLIENT.manga.getCharacters(mID);
    
    let description = '';
    let characterObj;
    let characterFound = false;
    let characterArr = [];
    let result = '';

    for (let i = 0; i < ch.length; i++) {
        if (getFirstName(characterName, (ch[i].character.name).toLowerCase())) {
            characterArr.push(ch[i]);
            characterFound = true;
        }
    }

    if (!characterFound) {
        result = "MCNFError";
    }

    let i = 0;
    if (characterFound) {
    characterObj = await JIKAN_CLIENT.characters.getFull(characterArr[i].character.id);

    if (characterObj) {
        description = getDescription(characterObj.about);
    } else {
        description = 'Description not found.';
    }
    
    let nicknames = '';
    if (characterObj.nicknames[0] === undefined) {
        nicknames = 'None';
    } else {
        nicknames = characterObj.nicknames.map(item => item).join(', ');
    }

    //last calling of vars
    const CHARACTER = characterArr[i].character.name;
    const URL = characterArr[i].character.url;
    const MANGA = manga.title.default;
    const ROLE = characterArr[i]?.role ?? 'Role information not found.';
    const DESCRIPTION = description;
    const IMAGE = characterArr[i].character.image.webp.default;
    const NICKNAMES = nicknames;
    
    switch(resu) {
        case 'name':
            result = CHARACTER;
            break;
        case 'url':
            result = URL;
            break;
        case 'image':
            result = IMAGE;
            break;
        case 'nicknames':
            result = NICKNAMES;
            break;
        case 'manga':
            result = MANGA;
            break;
        case 'description':
            result = DESCRIPTION;
            break;
        case 'role':
            result = ROLE;
            break;
    }

   }
    data.result = result;
    return {
      code: d.util.setCode(data),
    };
  }
}
