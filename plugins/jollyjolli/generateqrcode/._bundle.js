"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/jollyjolli/generateqrcode/generateQRCode.js
var require_generateQRCode = __commonJS({
  "plugins/jollyjolli/generateqrcode/generateQRCode.js"(exports2, module2) {
    "use strict";
    var fetch = require("node-fetch");
    module2.exports = {
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
      }
    };
  }
});

// plugins/jollyjolli/generateqrcode/package.json
var require_package = __commonJS({
  "plugins/jollyjolli/generateqrcode/package.json"(exports2, module2) {
    module2.exports = {
      name: "@jollyjolli/generateqrcode",
      version: "1.0.0",
      dependencies: {
        "node-fetch": "^2.6.12"
      }
    };
  }
});

// plugins/jollyjolli/generateqrcode/index.js
var generateQRCode = require_generateQRCode();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [generateQRCode]
};
