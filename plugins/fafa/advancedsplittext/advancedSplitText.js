module.exports = {
  name: "$advancedSplitText",
  type: "djs",
  author: "fafa",
  version: ["6.4.0"],
  description: "Splits given arguments with a new separator after a given amount.",
  example: "$advancedSplitText[hello, bye, ok;, ;2; || ]",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [content, separator, amount, newseparator = "\n"] = data.inside.splits;

    const list = content.split(separator);
    const chunks = [];

    let i = 0;
    while (i < list.length) {
      const chunk = list.slice(i, i + parseInt(amount));
      chunks.push(chunk);
      i += parseInt(amount);
    }

    const formattedChunks = chunks.map((chunk) => chunk.join(", "));

    data.result = formattedChunks.join(newseparator);
    return {
      code: d.util.setCode(data),
    };
  },
};
