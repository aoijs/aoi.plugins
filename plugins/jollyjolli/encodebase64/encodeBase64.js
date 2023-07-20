module.exports = {
  name: "$encodeBase64",
  type: "djs",
  author: "jollijolli",
  version: ["6.4.0"],
  description: "Encodes text to Base64.",
  example: "$encodeBase64[Hello, world!]",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [text] = data.inside.splits;
    const encodedText = Buffer.from(text).toString("base64");
    data.result = encodedText;
    return { code: d.util.setCode(data) };
  }
};
