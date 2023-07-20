const fetch = require("node-fetch");

module.exports = {
  name: "$generateQRCode",
  type: "djs",
  author: "jollyjolli",
  version: ["6.4.0"],
  description: "Generates a QR code image link from the provided text or URL.",
  example: "$generateQRCode[https://www.example.com]",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [input] = data.inside.splits;

    if (!input) {
      data.result = "No text or URL provided to generate QR code!";
      return { code: d.util.setCode(data) };
    }

    const encodedInput = encodeURIComponent(input);

    try {
      const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedInput}&size=200x200`;
      data.result = qrCodeURL;
    } catch (error) {
      data.result = "An error occurred while generating the QR code.";
      console.error("QR Code generation error:", error);
    }

    return { code: d.util.setCode(data) };
  },
};
