"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/jollyjolli/calculateExponent/package.json
var require_package = __commonJS({
  "plugins/jollyjolli/calculateExponent/package.json"(exports2, module2) {
    module2.exports = {
      name: "@jollyjolli/calculateexponent",
      version: "1.0.0"
    };
  }
});

// plugins/jollyjolli/calculateExponent/index.js
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: []
};
