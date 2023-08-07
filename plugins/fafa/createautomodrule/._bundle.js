"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/fafa/createautomodrule/createAutomodRule.js
var require_createAutomodRule = __commonJS({
  "plugins/fafa/createautomodrule/createAutomodRule.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$createAutomodRule",
      type: "djs",
      author: "fafa",
      version: ["6.4.0"],
      description: "Creates a automod rule.",
      example: "$createAutomodRule[$guildID;Leref Cutie;1;1;1;true;leref sucks,fafa cool]",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [guildID, ruleName, triggerType = 1, eventType = 1, actionType = 1, enableRule = true, ...rest] = data.inside.splits;
        const guild = d.client.guilds.cache.get(guildID);
        const triggerMetadata = {
          keywordFilter: rest.slice(0, rest.length - (rest.length > 2 ? 2 : 0)),
          regexPatterns: [],
          presets: [],
          allowList: [],
          mentionTotalLimit: null
        };
        const actions = [
          {
            type: parseInt(actionType),
            reason: "Auto moderation rule",
            metadata: {}
          }
        ];
        const exemptRoles = rest.length > 1 ? rest[rest.length - 2].split(",") : [];
        const exemptChannels = rest.length > 1 ? rest[rest.length - 1].split(",") : [];
        const autoModRule = await guild.autoModerationRules.create({
          name: ruleName,
          eventType: parseInt(eventType),
          triggerType: parseInt(triggerType),
          triggerMetadata,
          actions,
          enabled: enableRule,
          exempt_roles: exemptRoles,
          exempt_channels: exemptChannels
        });
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/fafa/createautomodrule/package.json
var require_package = __commonJS({
  "plugins/fafa/createautomodrule/package.json"(exports2, module2) {
    module2.exports = {
      name: "@fafa/createautomodrule",
      version: "1.0.0"
    };
  }
});

// plugins/fafa/createautomodrule/index.js
var createAutomodRule = require_createAutomodRule();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [createAutomodRule]
};
