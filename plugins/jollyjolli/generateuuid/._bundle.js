"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/jollyjolli/generateuuid/generateUUID.js
var require_generateUUID = __commonJS({
  "plugins/jollyjolli/generateuuid/generateUUID.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$generateUUID",
      type: "djs",
      author: "jollijolli",
      version: ["6.4.0"],
      description: "Generates a random UUID (Universally Unique Identifier).",
      example: "$generateUUID",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        function uuidv4() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
            return v.toString(16);
          });
        }
        const uuid = uuidv4();
        data.result = uuid;
        return { code: d.util.setCode(data) };
      }
    };
  }
});

// plugins/jollyjolli/generateuuid/package.json
var require_package = __commonJS({
  "plugins/jollyjolli/generateuuid/package.json"(exports2, module2) {
    module2.exports = {
      name: "@jollyjolli/generateuuid",
      version: "1.0.0"
    };
  }
});

// plugins/jollyjolli/generateuuid/index.js
var generateUUID = require_generateUUID();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [generateUUID]
};
