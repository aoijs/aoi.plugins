"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/nanotechpikachu/anime-manga/getID.js
var require_getID = __commonJS({
  "plugins/nanotechpikachu/anime-manga/getID.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$getID",
      type: "djs",
      author: "NanotechPikachu",
      version: ["6.6.1"],
      description: "Returns the ID of anime/manga passed as per in MAL",
      example: "$getID[sword art online;manga] // returns sword art online manga ID as in MAL",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        if (data.err)
          return d.error(data.err);
        const [name, type = "Anime"] = data.inside.splits;
        const Jikan = require("jikan4.js");
        const JIKAN_CLIENT2 = new Jikan.Client();
        if (!name) {
          return d.aoiError.fnError(d, "custom", {}, "Anime/Manga name not specified");
        }
        if (!type)
          return d.aoiError.fnError(d, "custom", {}, "Type not specified.");
        let searchResults;
        let foundID;
        const ty = type.toLowerCase().trim();
        const n = name.trim();
        if (ty != "anime" && ty != "manga") {
          return d.aoiError.fnError(d, "custom", {}, "Invalid type specified. Either Manga / Anime only");
        }
        switch (ty) {
          case "anime":
            searchResults = await JIKAN_CLIENT2.anime.search(n);
            break;
          case "manga":
            searchResults = await JIKAN_CLIENT2.manga.search(n);
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
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/nanotechpikachu/anime-manga/animeInfo.js
var require_animeInfo = __commonJS({
  "plugins/nanotechpikachu/anime-manga/animeInfo.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$animeInfo",
      type: "djs",
      author: "NanotechPikachu",
      version: ["6.6.1"],
      description: "Returns the info of the anime passed as ID",
      example: "$animeInfo[$getID[sword art online];studio] // returns sword art online anime studio.",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        if (data.err)
          return d.error(data.err);
        const [animeID, res] = data.inside.splits;
        if (!animeID)
          return d.aoiError.fnError(d, "custom", {}, "Anime ID not provided!");
        if (!res)
          return d.aoiError.fnError(d, "custom", {}, "No result type specified.");
        const aID = animeID.trim();
        const resu = res.trim().toLowerCase();
        const type = ["title", "synopsis", "synopsis2", "image", "ratings", "genre", "url", "episodes", "recommendations", "year", "trailer", "studio"];
        if (!type.includes(resu))
          return d.aoiError.fnError(d, "custom", {}, "Invalid result type.");
        const anime = await JIKAN_CLIENT.anime.get(aID);
        if (!anime)
          return d.aoiError.fnError(d, "custom", {}, "Invalid anime ID.");
        const stats = await JIKAN_CLIENT.anime.getStatistics(aID);
        let genres = anime.genres.map((genre) => genre.name).join(", ");
        const rec = await JIKAN_CLIENT.anime.getRecommendations(aID);
        if (!genres || genres.trim() === "") {
          genres = "No genre information.";
        }
        let synopsis = "";
        let synopsis2 = "\n";
        if (anime.synopsis) {
          if (anime.synopsis.length > 1024) {
            const midPoint = anime.synopsis.lastIndexOf(".", 1024);
            if (midPoint !== -1) {
              const synopsisFirstPart = anime.synopsis.substring(0, midPoint + 1);
              const synopsisSecondPart = anime.synopsis.substring(midPoint + 1);
              synopsis = synopsisFirstPart;
              synopsis2 = synopsisSecondPart;
            }
          } else {
            synopsis = anime.synopsis;
          }
        } else {
          synopsis = "Synopsis not found!";
        }
        let ratings = "";
        if (stats.scores) {
          let totalScore = 0;
          let totalVotes = 0;
          for (const obj of stats.scores) {
            totalScore += obj.score * obj.votes;
            totalVotes += obj.votes;
          }
          const averageScore = totalScore / totalVotes;
          ratings = `Average score based off ${totalVotes.toLocaleString()} votes: ${averageScore.toFixed(2) + " / 10"}`;
        } else {
          ratings = "Rating information not found.";
        }
        let recList = [];
        let recListString = "";
        if (rec.length > 2) {
          recList.push(rec[0].entry.title);
          recList.push(rec[1].entry.title);
          recListString = recList.map((item) => item).join(", ");
        } else {
          recListString = "No recommendations.";
        }
        const SYNOPSIS = synopsis;
        const SYNOPSIS2 = synopsis2;
        const URL = anime.url ?? "URL not found.";
        const EPISODES = anime.episodes?.toLocaleString() ?? "Episodes info not found.";
        const GENRES = genres;
        const RATINGS = ratings;
        const TITLE = anime.title.default;
        const IMAGE = anime.image.webp.default;
        const YEAR = anime.year ?? "Year information not found.";
        const TRAILER = anime?.trailer?.embedUrl ?? "Trailer not found.";
        const STUDIO = anime.studios[0]?.name ?? "Studio information not found.";
        const RECOMMENDATIONS = recListString;
        let result = "";
        switch (resu) {
          case "title":
            result = TITLE;
            break;
          case "synopsis":
            result = SYNOPSIS;
            break;
          case "synopsis2":
            result = SYNOPSIS2;
            break;
          case "url":
            result = URL;
            break;
          case "genre":
            result = GENRES;
            break;
          case "image":
            result = IMAGE;
            break;
          case "ratings":
            result = RATINGS;
            break;
          case "episodes":
            result = EPISODES;
            break;
          case "recommendations":
            result = RECOMMENDATIONS;
            break;
          case "year":
            result = YEAR;
            break;
          case "studio":
            result = STUDIO;
            break;
          case "trailer":
            result = TRAILER;
            break;
        }
        data.result = result;
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/nanotechpikachu/anime-manga/animeCharacterInfo.js
var require_animeCharacterInfo = __commonJS({
  "plugins/nanotechpikachu/anime-manga/animeCharacterInfo.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$animeCharInfo",
      type: "djs",
      author: "NanotechPikachu",
      version: ["6.6.1"],
      description: "Returns the character info of the character and anime ID passed.",
      example: "$animeCharInfo[$getID[sword art online];Asuna;nicknames] // returns sword art online's asuna's nicknames.",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        if (data.err)
          return d.error(data.err);
        const [animeID, character, res] = data.inside.splits;
        const Jikan = require("jikan4.js");
        const JIKAN_CLIENT2 = new Jikan.Client();
        function getFirstName(characterName2, databaseNames) {
          let res2 = false;
          const nameParts = databaseNames.split(",").map((part) => part.trim().toLowerCase());
          if (nameParts.includes(characterName2.toLowerCase())) {
            res2 = true;
          }
          ;
          return res2;
        }
        ;
        function getDescription(characterDescription) {
          let description2;
          if (!characterDescription) {
            return description2 = "Description not found.";
          } else {
            if (characterDescription.length > 1024) {
              const midPoint = characterDescription.lastIndexOf(".", 1024);
              if (midPoint !== -1) {
                const descriptionFirstPart = characterDescription.substring(0, midPoint + 1);
                description2 = descriptionFirstPart;
              }
            } else {
              description2 = characterDescription;
            }
          }
          return description2;
        }
        if (!animeID)
          return d.aoiError.fnError(d, "custom", {}, "Anime ID not provided.");
        if (!character)
          return d.aoiError.fnError(d, "custom", {}, "Character not provided.");
        if (!res)
          return d.aoiError.fnError(d, "custom", {}, "Enter the result type.");
        const aID = animeID.trim();
        const characterName = character.trim().toLowerCase();
        const resu = res.trim().toLowerCase();
        const type = ["name", "url", "voiceactor", "image", "nicknames", "role", "description", "anime"];
        if (!type.includes(resu))
          return d.aoiError.fnError(d, "custom", {}, "Invalid result type entered.");
        const anime = await JIKAN_CLIENT2.anime.get(aID);
        if (!anime)
          return d.aoiError.fnError(d, "custom", {}, "Anime not found.");
        const ch = await JIKAN_CLIENT2.anime.getCharacters(aID);
        const animeName = anime.title.default;
        let description = "";
        let characterObj;
        let characterFound = false;
        let characterArr = [];
        let result = "";
        for (let i2 = 0; i2 < ch.length; i2++) {
          if (getFirstName(characterName, ch[i2].character.name.toLowerCase())) {
            characterArr.push(ch[i2]);
            characterFound = true;
          }
        }
        if (!characterFound) {
          result = "ACNFError";
        }
        let i = 0;
        if (characterFound) {
          characterObj = await JIKAN_CLIENT2.characters.getFull(characterArr[i].character.id);
          if (characterObj) {
            description = getDescription(characterObj.about);
          } else {
            description = "Description not found.";
          }
          let nicknames = "";
          if (characterObj.nicknames[0] === void 0) {
            nicknames = "None";
          } else {
            nicknames = characterObj.nicknames.map((item) => item).join(", ");
          }
          let va = "";
          if (characterArr[i]?.voiceActors[0] === void 0) {
            va = "No information found.";
          } else {
            va = characterArr[i]?.voiceActors[0]?.person.name;
          }
          const CHARACTER = characterArr[i].character.name;
          const VOICEACTOR = va;
          const URL = characterArr[i].character.url;
          const ANIME = animeName;
          const ROLE = characterArr[i]?.role ?? "Role information not found.";
          const DESCRIPTION = description;
          const IMAGE = characterArr[i].character.image.webp.default;
          const NICKNAMES = nicknames;
          switch (resu) {
            case "name":
              result = CHARACTER;
              break;
            case "url":
              result = URL;
              break;
            case "image":
              result = IMAGE;
              break;
            case "nicknames":
              result = NICKNAMES;
              break;
            case "anime":
              result = ANIME;
              break;
            case "description":
              result = DESCRIPTION;
              break;
            case "role":
              result = ROLE;
              break;
            case "voiceactor":
              result = VOICEACTOR;
              break;
          }
        }
        data.result = result;
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/nanotechpikachu/anime-manga/mangaInfo.js
var require_mangaInfo = __commonJS({
  "plugins/nanotechpikachu/anime-manga/mangaInfo.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$mangaInfo",
      type: "djs",
      author: "NanotechPikachu",
      version: ["6.6.1"],
      description: "Returns the info of the manga passed as ID",
      example: "$mangaInfo[$getID[the eminence in shadow;manga];author] // returns the eminence in shadow manga's author.",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        if (data.err)
          return d.error(data.err);
        const Jikan = require("jikan4.js");
        const JIKAN_CLIENT2 = new Jikan.Client();
        const [mangaID, res] = data.inside.splits;
        if (!mangaID)
          return d.aoiError.fnError(d, "custom", {}, "Anime ID not provided!");
        if (!res)
          return d.aoiError.fnError(d, "custom", {}, "No result type specified.");
        const mID = mangaID.trim();
        const resu = res.trim().toLowerCase();
        const type = ["title", "synopsis", "background", "image", "ratings", "genre", "url", "volumes", "serializations", "year", "author", "popularity"];
        if (!type.includes(resu))
          return d.aoiError.fnError(d, "custom", {}, "Invalid result type.");
        const manga = await JIKAN_CLIENT2.manga.get(mID);
        if (!manga)
          return d.aoiError.fnError(d, "custom", {}, "Invalid manga ID.");
        const stats = await JIKAN_CLIENT2.manga.getStatistics(mID);
        let genres = manga.genres.map((genre) => genre.name).join(", ");
        if (!genres || genres.trim() === "") {
          genres = "No genre information.";
        }
        let ratings = "";
        if (stats.scores) {
          let totalScore = 0;
          let totalVotes = 0;
          for (const obj of stats.scores) {
            totalScore += obj.score * obj.votes;
            totalVotes += obj.votes;
          }
          const averageScore = totalScore / totalVotes;
          ratings = `Average score based off ${totalVotes.toLocaleString()} votes: ${averageScore.toFixed(2) + " / 10"}`;
        } else {
          ratings = "Rating information not found.";
        }
        const SYNOPSIS = manga.synopsis ?? "Synopsis not found!";
        const BACKGROUND = manga.background ?? "Background not found!";
        const URL = manga.url ?? "URL not found.";
        const GENRES = genres;
        const RATINGS = ratings;
        const TITLE = manga.title.default;
        const IMAGE = manga.image.webp.default;
        const YEAR = manga.publishInfo?.publishedFrom?.getFullYear() ?? "Year information not found.";
        const AUTHOR = manga.authors[0].name ?? "Author information unavailable!";
        const VOLUMES = manga.volumes?.toLocaleString() ?? "Volume information not found!";
        const POPULARITY = manga.popularity?.toLocaleString() ?? "Popularity information not found!";
        const SERIALIZATIONS = manga.serializations[0]?.name ?? "Serialization info not found!";
        let result = "";
        switch (resu) {
          case "title":
            result = TITLE;
            break;
          case "synopsis":
            result = SYNOPSIS;
            break;
          case "background":
            result = BACKGROUND;
            break;
          case "url":
            result = URL;
            break;
          case "genre":
            result = GENRES;
            break;
          case "image":
            result = IMAGE;
            break;
          case "ratings":
            result = RATINGS;
            break;
          case "author":
            result = AUTHOR;
            break;
          case "year":
            result = YEAR;
            break;
          case "volumes":
            result = VOLUMES;
            break;
          case "popularity":
            result = POPULARITY;
            break;
          case "serializations":
            result = SERIALIZATIONS;
            break;
        }
        data.result = result;
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/nanotechpikachu/anime-manga/mangaCharacterInfo.js
var require_mangaCharacterInfo = __commonJS({
  "plugins/nanotechpikachu/anime-manga/mangaCharacterInfo.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$mangaCharInfo",
      type: "djs",
      author: "NanotechPikachu",
      version: ["6.6.1"],
      description: "Returns the character info of the character and manga ID passed.",
      example: "$mangaCharInfo[$getID[the eminence in shadow;manga];Cid;image] // returns the eminence in shadow's Cid's image.",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        if (data.err)
          return d.error(data.err);
        const [mangaID, character, res] = data.inside.splits;
        const Jikan = require("jikan4.js");
        const JIKAN_CLIENT2 = new Jikan.Client();
        function getFirstName(characterName2, databaseNames) {
          let res2 = false;
          const nameParts = databaseNames.split(",").map((part) => part.trim().toLowerCase());
          if (nameParts.includes(characterName2.toLowerCase())) {
            res2 = true;
          }
          ;
          return res2;
        }
        ;
        function getDescription(characterDescription) {
          let description2;
          if (!characterDescription) {
            return description2 = "Description not found.";
          } else {
            if (characterDescription.length > 1024) {
              const midPoint = characterDescription.lastIndexOf(".", 1024);
              if (midPoint !== -1) {
                const descriptionFirstPart = characterDescription.substring(0, midPoint + 1);
                description2 = descriptionFirstPart;
              }
            } else {
              description2 = characterDescription;
            }
          }
          return description2;
        }
        if (!mangaID)
          return d.aoiError.fnError(d, "custom", {}, "Anime ID not provided.");
        if (!character)
          return d.aoiError.fnError(d, "custom", {}, "Character not provided.");
        if (!res)
          return d.aoiError.fnError(d, "custom", {}, "Enter the result type.");
        const mID = mangaID.trim();
        const characterName = character.trim().toLowerCase();
        const resu = res.trim().toLowerCase();
        const type = ["name", "url", , "image", "nicknames", "role", "description", "manga"];
        if (!type.includes(resu))
          return d.aoiError.fnError(d, "custom", {}, "Invalid result type entered.");
        const manga = await JIKAN_CLIENT2.manga.get(mID);
        if (!manga)
          return d.aoiError.fnError(d, "custom", {}, "Manga not found.");
        const ch = await JIKAN_CLIENT2.manga.getCharacters(mID);
        let description = "";
        let characterObj;
        let characterFound = false;
        let characterArr = [];
        let result = "";
        for (let i2 = 0; i2 < ch.length; i2++) {
          if (getFirstName(characterName, ch[i2].character.name.toLowerCase())) {
            characterArr.push(ch[i2]);
            characterFound = true;
          }
        }
        if (!characterFound) {
          result = "MCNFError";
        }
        let i = 0;
        if (characterFound) {
          characterObj = await JIKAN_CLIENT2.characters.getFull(characterArr[i].character.id);
          if (characterObj) {
            description = getDescription(characterObj.about);
          } else {
            description = "Description not found.";
          }
          let nicknames = "";
          if (characterObj.nicknames[0] === void 0) {
            nicknames = "None";
          } else {
            nicknames = characterObj.nicknames.map((item) => item).join(", ");
          }
          const CHARACTER = characterArr[i].character.name;
          const URL = characterArr[i].character.url;
          const MANGA = manga.title.default;
          const ROLE = characterArr[i]?.role ?? "Role information not found.";
          const DESCRIPTION = description;
          const IMAGE = characterArr[i].character.image.webp.default;
          const NICKNAMES = nicknames;
          switch (resu) {
            case "name":
              result = CHARACTER;
              break;
            case "url":
              result = URL;
              break;
            case "image":
              result = IMAGE;
              break;
            case "nicknames":
              result = NICKNAMES;
              break;
            case "manga":
              result = MANGA;
              break;
            case "description":
              result = DESCRIPTION;
              break;
            case "role":
              result = ROLE;
              break;
          }
        }
        data.result = result;
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/nanotechpikachu/anime-manga/package.json
var require_package = __commonJS({
  "plugins/nanotechpikachu/anime-manga/package.json"(exports2, module2) {
    module2.exports = {
      name: "@nanotechpikachu/anime-manga",
      version: "1.0.0",
      dependencies: {
        "jikan4.js": "^1.5.8"
      }
    };
  }
});

// plugins/nanotechpikachu/anime-manga/index.js
var getID = require_getID();
var animeInfo = require_animeInfo();
var animeCharInfo = require_animeCharacterInfo();
var mangaInfo = require_mangaInfo();
var mangaCharInfo = require_mangaCharacterInfo();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [getID, mangaInfo, mangaCharInfo, animeInfo, animeCharInfo]
};
