"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/default/comment/comment.js
var require_comment = __commonJS({
  "plugins/default/comment/comment.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$comment",
      type: "djs",
      author: "default",
      version: "6.4.0",
      description: "To comment in a code",
      example: "$comment[This is a comment, it will not be executed]",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [text] = data.inside.splits;
        if (!text)
          return d.aoiError.fnError(d, "custom", {}, "No Text was Provided");
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/default/comment/package.json
var require_package = __commonJS({
  "plugins/default/comment/package.json"(exports2, module2) {
    module2.exports = {
      name: "default/comment",
      version: "1.0.0"
    };
  }
});

// plugins/default/comment/index.js
var comment = require_comment();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [comment]
};
