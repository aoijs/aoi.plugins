"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/jollyjolli/country/country.js
var require_country = __commonJS({
  "plugins/jollyjolli/country/country.js"(exports2, module2) {
    "use strict";
    var fetch = require("node-fetch");
    async function getCountryData(country2) {
      const response = await fetch("https://www.jsonkeeper.com/b/L23E");
      const data = await response.json();
      const countryData = data.countries.find(
        (c) => c.name_en.toLowerCase() === country2.toLowerCase() || c.name_es.toLowerCase() === country2.toLowerCase()
      );
      return countryData;
    }
    module2.exports = {
      name: "$country",
      type: "djs",
      author: "jollijolli",
      version: ["6.4.0"],
      description: "Get information about a country.",
      example: "$country[China;China's Capital: {capital_en}]",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [country2, format, imageValue] = data.inside.splits;
        const countryData = await getCountryData(country2);
        if (!countryData) {
          return d.aoiError.fnError(d, "custom", {}, "country");
        }
        let result = format;
        const placeholders = {
          "{name_en}": countryData.name_en,
          "{name_es}": countryData.name_es,
          "{continent_en}": countryData.continent_en,
          "{continent_es}": countryData.continent_es,
          "{capital_en}": countryData.capital_en,
          "{capital_es}": countryData.capital_es,
          "{dial_code}": countryData.dial_code,
          "{code_2}": countryData.code_2,
          "{code_3}": countryData.code_3,
          "{tld}": countryData.tld,
          "{km2}": countryData.km2,
          "{flag}": `:flag_${countryData.code_2.toLowerCase()}:`
        };
        let imageUrl = "";
        if (imageValue === "width" || imageValue === "w") {
          imageUrl = `https://flagcdn.com/w2560/${countryData.code_2.toLowerCase()}.jpg`;
        } else if (imageValue === "height" || imageValue === "h") {
          imageUrl = `https://flagcdn.com/h240/${countryData.code_2.toLowerCase()}.jpg`;
        }
        placeholders["{image}"] = imageUrl;
        for (const placeholder in placeholders) {
          result = result.replace(new RegExp(placeholder, "g"), placeholders[placeholder]);
        }
        data.result = result;
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/jollyjolli/country/package.json
var require_package = __commonJS({
  "plugins/jollyjolli/country/package.json"(exports2, module2) {
    module2.exports = {
      name: "@jollyjolli/country",
      version: "1.0.0",
      dependencies: {
        "node-fetch": "^2.6.12"
      }
    };
  }
});

// plugins/jollyjolli/country/index.js
var country = require_country();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [country]
};
