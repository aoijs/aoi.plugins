"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/jollyjolli/calculateexponent/calculateExponent.js
var require_calculateExponent = __commonJS({
  "plugins/jollyjolli/calculateexponent/calculateExponent.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$calculateExponent",
      type: "djs",
      author: "jollijolli",
      version: ["6.4.0"],
      description: "Calculates the result of raising a given base to the power of a specified exponent.",
      example: "$calculateExponent[base;exponent]",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [base, exponent] = data.inside.splits.map(Number);
        if (isNaN(base) || isNaN(exponent)) {
          data.result = "Invalid input! Both base and exponent must be numbers.";
          return { code: d.aoiError.fnError(d, "custom", {}, data.result) };
        }
        const result = Math.pow(base, exponent);
        data.result = result.toString();
        return { code: d.util.setCode(data) };
      }
    };
  }
});

// plugins/jollyjolli/calculateexponent/package.json
var require_package = __commonJS({
  "plugins/jollyjolli/calculateexponent/package.json"(exports2, module2) {
    module2.exports = {
      name: "@jollyjolli/calculateexponent",
      version: "1.0.0"
    };
  }
});

// plugins/jollyjolli/calculateexponent/index.js
var calculateExponent = require_calculateExponent();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [calculateExponent]
};
