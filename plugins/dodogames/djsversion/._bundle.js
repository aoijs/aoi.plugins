"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/dodogames/djsversion/djsversion.js
var require_djsversion = __commonJS({
  "plugins/dodogames/djsversion/djsversion.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$djsversion",
      type: "djs",
      author: "dodoGames",
      version: ["6.4.0"],
      description: "Returns the current discord.js version the bot is using",
      example: "Will return 14.11.0 as a example",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const { version } = require("discord.js");
        data.result = version;
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/dodogames/djsversion/package.json
var require_package = __commonJS({
  "plugins/dodogames/djsversion/package.json"(exports2, module2) {
    module2.exports = {
      name: "@dodogames/djsversion",
      version: "1.0.0",
      dependencies: {
        "discord.js": "^14.11.0"
      }
    };
  }
});

// plugins/dodogames/djsversion/index.js
var djsversion = require_djsversion();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [djsversion]
};
