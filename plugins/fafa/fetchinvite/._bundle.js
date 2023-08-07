"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/fafa/fetchinvite/fetchInvite.js
var require_fetchInvite = __commonJS({
  "plugins/fafa/fetchinvite/fetchInvite.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$fetchInvite",
      type: "djs",
      author: "fafa",
      version: ["6.4.0"],
      description: "Returns information of a specific invite.",
      example: "$fetchInvite[HMUfMXDQsV;inviter.username]",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [inviteCode, property] = data.inside.splits;
        try {
          const response = await fetch(
            `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=true`
          );
          if (!response.ok) {
            d.aoiError.fnError(d, "custom", { inside: data.inside }, response.statusText);
          }
          const inviteData = await response.json();
          const properties = property.split(".");
          let result = inviteData;
          for (const prop of properties) {
            if (result && result.hasOwnProperty(prop)) {
              result = result[prop];
            } else {
              return d.aoiError.fnError(d, "custom", { inside: data.inside }, "property");
            }
          }
          data.result = result;
          return {
            code: d.util.setCode(data)
          };
        } catch (error) {
          console.error(error);
          return d.aoiError.fnError(d, "custom", { inside: data.inside }, "invite");
        }
      }
    };
  }
});

// plugins/fafa/fetchinvite/package.json
var require_package = __commonJS({
  "plugins/fafa/fetchinvite/package.json"(exports2, module2) {
    module2.exports = {
      name: "@fafa/fetchinvite",
      version: "1.0.0"
    };
  }
});

// plugins/fafa/fetchinvite/index.js
var fetchInvite = require_fetchInvite();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [fetchInvite]
};
