module.exports = {
    name: "$animeInfo",
    type: "djs", 
    author: "NanotechPikachu",
    version: ["6.6.1"], 
    description: "Returns the info of the anime passed as ID",
    example: "$animeInfo[$getID[sword art online];studio] // returns sword art online anime studio.",
    code: async d => {
    const data = d.util.aoiFunc(d);

    if (data.err) return d.error(data.err); 
    
    const [animeID, res] = data.inside.splits;
    
    if (!animeID) return d.aoiError.fnError(d, "custom", {}, "Anime ID not provided!")
    if (!res) return d.aoiError.fnError(d, "custom", {}, "No result type specified.")
    
    const aID = animeID.trim()
    const resu = res.trim().toLowerCase()
    const type = ['title', 'synopsis', 'synopsis2', 'image', 'ratings', 'genre', 'url', 'episodes', 'recommendations', 'year', 'trailer', 'studio'];
    
    if (!type.includes(resu)) return d.aoiError.fnError(d, "custom", {}, "Invalid result type.");
    
    const anime = await JIKAN_CLIENT.anime.get(aID);
    
    if (!anime) return d.aoiError.fnError(d, "custom", {}, "Invalid anime ID.");
    
    const stats = await JIKAN_CLIENT.anime.getStatistics(aID);
    let genres = anime.genres.map(genre => genre.name).join(', ');
    const rec = await JIKAN_CLIENT.anime.getRecommendations(aID);

    if (!genres || genres.trim() === '') {
        genres = 'No genre information.';
        }
        
    let synopsis = '';
    let synopsis2 = '\n';

    //SPLITS SYNOPSIS IF TOO LONG INTO 2-3 PARAGRAPHS. 
    if (anime.synopsis) {
        if (anime.synopsis.length > 1024) {
            const midPoint = anime.synopsis.lastIndexOf('.', 1024);
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
         synopsis = 'Synopsis not found!';
        }

    let ratings = '';

    if (stats.scores) {
        let totalScore = 0;
        let totalVotes = 0;

        for (const obj of stats.scores) {
            totalScore += obj.score * obj.votes;
            totalVotes += obj.votes;
        }

        const averageScore = totalScore / totalVotes;

        ratings = `Average score based off ${totalVotes.toLocaleString()} votes: ${averageScore.toFixed(2) + ' / 10'}`;
        } else {
            ratings = 'Rating information not found.';
        }
        
    //DISPLAY RECOMMENDED TITLES 
    let recList = [];
    let recListString = '';

    if (rec.length > 2) {
        recList.push(rec[0].entry.title);
        recList.push(rec[1].entry.title);
        recListString = recList.map(item => item).join(', ');
    } else {
            recListString = 'No recommendations.';
    }
    
    //SYNOPSIS, URL, EPISODES, GENRES, RATINGS, ETC.
    const SYNOPSIS = synopsis;
    const SYNOPSIS2 = synopsis2;
    const URL = anime.url ?? 'URL not found.';
    const EPISODES = anime.episodes?.toLocaleString() ?? 'Episodes info not found.';
    const GENRES = genres;
    const RATINGS = ratings;
    const TITLE = anime.title.default;
    const IMAGE = anime.image.webp.default;
    const YEAR = anime.year ??  'Year information not found.';
    const TRAILER = anime?.trailer?.embedUrl ?? 'Trailer not found.';
    const STUDIO = anime.studios[0]?.name ?? 'Studio information not found.';
    const RECOMMENDATIONS = recListString
    
    let result = '';
    
    switch(resu) {
        case 'title':
            result = TITLE;
            break;
        case 'synopsis':
            result = SYNOPSIS;
            break;
        case 'synopsis2':
            result = SYNOPSIS2;
            break;
        case 'url':
            result = URL;
            break;
        case 'genre': 
            result = GENRES;
            break;
        case 'image':
            result = IMAGE;
            break;
        case 'ratings':
            result = RATINGS;
            break;
        case 'episodes':
            result = EPISODES;
            break;
        case 'recommendations':
            result = RECOMMENDATIONS;
            break;
        case 'year':
            result = YEAR;
            break;
        case 'studio':
            result = STUDIO;
            break;
        case 'trailer':
            result = TRAILER;
            break;
    }
    
    data.result = result;
    return {
      code: d.util.setCode(data),
    };
  }
}
