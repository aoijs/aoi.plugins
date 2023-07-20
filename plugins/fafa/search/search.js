module.exports = {
  name: "$search",
  type: "djs",
  author: "fafa",
  version: ["6.4.0"],
  description: "Search for a song using @akarui/aoi.music.",
  example: "$search[youtube;hello]",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [ type = "youtube", query, format = "{title} by {artist} ({duration})", list = 5 ] = data.inside.splits;

    if (!d.client.voiceManager) {
        d.aoiError.fnError(d, "custom", { }, "you require @akarui/aoi.music to use this, install it with `npm i @akarui/aoi.music`");
    }

    const searchType = type.toLowerCase() === "youtube" ? 3 : 0;

    let results;
    if (searchType === 3) {
      results = await d.client.voiceManager.search(3, query, list);
    } else if (searchType === 0) {
      results = await d.client.voiceManager.search(0, query, list);
    }

    if (results.length === 0) {
      data.result = "No songs found with the given query!";
      return {
        code: d.util.setCode(data),
      };
    }

    const formattedResults = results.map((result) => {
      let formattedResult = format;

      const placeholders = {
        "{title}": result.title,
        "{artist}":
          searchType === 3
            ? result.author.name
            : result.publisher_metadata?.artist || "Unknown Artist",
        "{duration}":
          searchType === 3 ? result.duration.seconds * 1000 : result.duration,
        "{formattedDuration}":
          searchType === 3
            ? result.duration.text
            : new Date(result.duration).toISOString().substr(14, 5),
        "{id}": result.id,
        "{url}":
          searchType === 3
            ? "https://www.youtube.com/watch?v=" + result.id
            : result.permalink_url,
      };

      for (const placeholder in placeholders) {
        formattedResult = formattedResult.replace(
          new RegExp(placeholder, "g"),
          placeholders[placeholder]
        );
      }

      return formattedResult;
    });

    data.result = formattedResults.join("\n");

    return {
      code: d.util.setCode(data),
    };
  },
};
