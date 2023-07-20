"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/dodogames/clientaboutme/clientaboutme.js
var require_clientaboutme = __commonJS({
  "plugins/dodogames/clientaboutme/clientaboutme.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$clientaboutme",
      type: "djs",
      author: "dodoGames",
      version: ["6.4.0"],
      description: "Returns the bot about me by returning the application description from developer portal",
      example: "If the application description is test then it will return test upon running the function",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        data.result = d.client.application.description;
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/dodogames/clientaboutme/package.json
var require_package = __commonJS({
  "plugins/dodogames/clientaboutme/package.json"(exports2, module2) {
    module2.exports = {
      name: "@dodogames/clientaboutme",
      version: "1.0.0"
    };
  }
});

// plugins/dodogames/clientaboutme/index.js
var clientaboutme = require_clientaboutme();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [clientaboutme]
};
