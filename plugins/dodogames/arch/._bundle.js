"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/dodogames/arch/arch.js
var require_arch = __commonJS({
  "plugins/dodogames/arch/arch.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$arch",
      type: "djs",
      author: "dodoGames",
      version: "6.4.0",
      description: "Returns the current system architecture the host/OS is using.",
      example: "Will return x64, arm, arm64, ppc, etc depending on the current system architecture used",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        data.result = process.arch;
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/dodogames/arch/package.json
var require_package = __commonJS({
  "plugins/dodogames/arch/package.json"(exports2, module2) {
    module2.exports = {
      name: "@dodogames/arch",
      version: "1.0.0"
    };
  }
});

// plugins/dodogames/arch/index.js
var arch = require_arch();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [arch]
};
