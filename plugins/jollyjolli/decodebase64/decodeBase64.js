module.exports = {
  name: "$decodeBase64",
  type: "djs",
  author: "jollijolli",
  version: ["6.4.0"],
  description: "Decodes Base64 to text.",
  example: "$decodeBase64[TGVyZWYgaXMgdGhlIGdvYXQ=]",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [base64] = data.inside.splits;
    const decodedText = Buffer.from(base64, "base64").toString();
    data.result = decodedText;
    return { code: d.util.setCode(data) };
  }
};
