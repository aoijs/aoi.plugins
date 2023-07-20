"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/jollyjolli/cryptoValue/package.json
var require_package = __commonJS({
  "plugins/jollyjolli/cryptoValue/package.json"(exports2, module2) {
    module2.exports = {
      name: "@jollyjolli/cryptovalue",
      version: "1.0.0"
    };
  }
});

// plugins/jollyjolli/cryptoValue/index.js
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
