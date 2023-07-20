"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/default/os/os.js
var require_os = __commonJS({
  "plugins/default/os/os.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$os",
      type: "djs",
      author: "default",
      version: ["6.4.0"],
      description: "Returns the OS of the system",
      example: "The OS of the system is $os",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const os2 = require("os");
        data.result = os2.platform();
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/default/os/package.json
var require_package = __commonJS({
  "plugins/default/os/package.json"(exports2, module2) {
    module2.exports = {
      name: "@default/os",
      version: "1.0.0"
    };
  }
});

// plugins/default/os/index.js
var os = require_os();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [os]
};
