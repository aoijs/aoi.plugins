"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/jollyjolli/encodebase64/encodeBase64.js
var require_encodeBase64 = __commonJS({
  "plugins/jollyjolli/encodebase64/encodeBase64.js"(exports2, module2) {
    "use strict";
    module2.exports = {
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
  }
});

// plugins/jollyjolli/encodebase64/package.json
var require_package = __commonJS({
  "plugins/jollyjolli/encodebase64/package.json"(exports2, module2) {
    module2.exports = {
      name: "@jollyjolli/encodebase64",
      version: "1.0.0"
    };
  }
});

// plugins/jollyjolli/encodebase64/index.js
var encodeBase64 = require_encodeBase64();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [encodeBase64]
};
