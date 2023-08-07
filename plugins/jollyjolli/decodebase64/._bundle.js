"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/jollyjolli/decodebase64/decodeBase64.js
var require_decodeBase64 = __commonJS({
  "plugins/jollyjolli/decodebase64/decodeBase64.js"(exports2, module2) {
    "use strict";
    module2.exports = {
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
  }
});

// plugins/jollyjolli/decodebase64/package.json
var require_package = __commonJS({
  "plugins/jollyjolli/decodebase64/package.json"(exports2, module2) {
    module2.exports = {
      name: "@jollyjolli/decodebase64",
      version: "1.0.0"
    };
  }
});

// plugins/jollyjolli/decodebase64/index.js
var decodeBase64 = require_decodeBase64();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [decodeBase64]
};
