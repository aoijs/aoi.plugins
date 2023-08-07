"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/fafa/advancedsplittext/advancedSplitText.js
var require_advancedSplitText = __commonJS({
  "plugins/fafa/advancedsplittext/advancedSplitText.js"(exports2, module2) {
    "use strict";
    module2.exports = {
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
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/fafa/advancedsplittext/package.json
var require_package = __commonJS({
  "plugins/fafa/advancedsplittext/package.json"(exports2, module2) {
    module2.exports = {
      name: "@fafa/advancedsplittext",
      version: "1.0.0"
    };
  }
});

// plugins/fafa/advancedsplittext/index.js
var advancedSplitText = require_advancedSplitText();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [advancedSplitText]
};
