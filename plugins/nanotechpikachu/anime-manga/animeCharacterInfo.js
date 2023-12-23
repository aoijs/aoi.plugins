module.exports = {
    name: "$animeCharInfo",
    type: "djs", 
    author: "NanotechPikachu",
    version: ["6.6.1"], 
    description: "Returns the character info of the character and anime ID passed.",
    example: "$animeCharInfo[$getID[sword art online];Asuna;nicknames] // returns sword art online's asuna's nicknames.",
    code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err); 
    
    const [animeID, character, res] = data.inside.splits;

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
    
    if (!animeID) return d.aoiError.fnError(d, "custom", {}, "Anime ID not provided.");
    if (!character) return d.aoiError.fnError(d, "custom", {}, "Character not provided.");
    if (!res) return d.aoiError.fnError(d, "custom", {}, "Enter the result type.")
    
    const aID = animeID.trim();
    const characterName = character.trim().toLowerCase();
    const resu = res.trim().toLowerCase();
    
    const type = ["name", "url", "voiceactor", "image", "nicknames", "role", "description", "anime"];
    
    if (!type.includes(resu)) return d.aoiError.fnError(d, "custom", {}, "Invalid result type entered.")
    
    const anime = await JIKAN_CLIENT.anime.get(aID);
    if (!anime) return d.aoiError.fnError(d, "custom", {}, "Anime not found.");
    
    const ch = await JIKAN_CLIENT.anime.getCharacters(aID);
    const animeName = anime.title.default;
    
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
        result = "ACNFError"
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
    let va = '';
    if (characterArr[i]?.voiceActors[0] === undefined) {
        va = 'No information found.';
    } else {
        va = characterArr[i]?.voiceActors[0]?.person.name;
    }

    //last calling of vars
    const CHARACTER = characterArr[i].character.name;
    const VOICEACTOR = va;
    const URL = characterArr[i].character.url;
    const ANIME = animeName;
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
        case 'anime':
            result = ANIME;
            break;
        case 'description':
            result = DESCRIPTION;
            break;
        case 'role':
            result = ROLE;
            break;
        case 'voiceactor':
            result = VOICEACTOR;
            break;
    }

   }
    data.result = result;
    return {
      code: d.util.setCode(data),
    };
  }
}
