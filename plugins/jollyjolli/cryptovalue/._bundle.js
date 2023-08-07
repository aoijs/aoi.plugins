"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/jollyjolli/cryptovalue/cryptoValue.js
var require_cryptoValue = __commonJS({
  "plugins/jollyjolli/cryptovalue/cryptoValue.js"(exports2, module2) {
    "use strict";
    async function getCryptoValue(cryptoName) {
      const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data && data[cryptoName] && data[cryptoName].usd) {
          return data[cryptoName].usd;
        } else {
          return null;
        }
      } catch (error) {
        console.error("An error occurred while fetching crypto value:", error);
        return null;
      }
    }
    module2.exports = {
      name: "$cryptoValue",
      type: "djs",
      author: "jollijolli",
      version: ["6.4.0"],
      description: "Get the value of a crypto in US Dolars",
      example: "$cryptoValue[bitcoin]",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [cryptoName] = data.inside.splits;
        const value = await getCryptoValue(cryptoName);
        if (value !== null) {
          data.result = value.toString();
        } else {
          data.result = "N/A";
        }
        return { code: d.util.setCode(data) };
      }
    };
  }
});

// plugins/jollyjolli/cryptovalue/package.json
var require_package = __commonJS({
  "plugins/jollyjolli/cryptovalue/package.json"(exports2, module2) {
    module2.exports = {
      name: "@jollyjolli/cryptovalue",
      version: "1.0.0"
    };
  }
});

// plugins/jollyjolli/cryptovalue/index.js
var cryptoValue = require_cryptoValue();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [cryptoValue]
};
