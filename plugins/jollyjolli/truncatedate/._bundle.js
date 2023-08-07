"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/jollyjolli/truncatedate/truncateDate.js
var require_truncateDate = __commonJS({
  "plugins/jollyjolli/truncatedate/truncateDate.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$truncateDate",
      type: "djs",
      author: "jollijolli",
      version: ["6.4.0"],
      description: "Truncates the date",
      example: "$truncateDate",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const currentDate = Date.now();
        const truncatedDate = Math.trunc(currentDate / 1e3);
        data.result = truncatedDate;
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/jollyjolli/truncatedate/package.json
var require_package = __commonJS({
  "plugins/jollyjolli/truncatedate/package.json"(exports2, module2) {
    module2.exports = {
      name: "@jollyjolli/truncatedate",
      version: "1.0.0"
    };
  }
});

// plugins/jollyjolli/truncatedate/index.js
var truncateDate = require_truncateDate();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [truncateDate]
};
