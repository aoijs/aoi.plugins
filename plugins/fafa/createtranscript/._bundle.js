"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/fafa/createtranscript/createTranscript.js
var require_createTranscript = __commonJS({
  "plugins/fafa/createtranscript/createTranscript.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$createTranscript",
      type: "djs",
      author: "fafa",
      version: ["6.4.0"],
      description: "Create a channel transcript using discord-html-transcripts.",
      example: "$createTranscript[$channelID;$channelID]",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [channel = d.message.channel.id, logchannel = d.message.channel.id] = data.inside.splits;
        let ready;
        try {
          require("discord-html-transcripts");
          ready = true;
        } catch (e) {
          ready = false;
        }
        if (ready === false) {
          d.aoiError.fnError(d, "custom", {}, "you require discord-html-transcripts to use this, install it with `npm i discord-html-transcripts`");
        }
        const discordTranscripts = require("discord-html-transcripts");
        let channelid = await d.util.getChannel(d, channel);
        let logging = await d.util.getChannel(d, logchannel);
        const attachment = await discordTranscripts.createTranscript(channelid, {
          filename: "transcript.html",
          saveImages: true,
          poweredBy: false
        });
        const f = await logging.send({
          files: [attachment]
        });
        data.result = f;
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/fafa/createtranscript/package.json
var require_package = __commonJS({
  "plugins/fafa/createtranscript/package.json"(exports2, module2) {
    module2.exports = {
      name: "@fafa/createtranscript",
      version: "1.0.0",
      dependencies: {
        "discord-html-transcripts": "^3.1.5"
      }
    };
  }
});

// plugins/fafa/createtranscript/index.js
var createTranscript = require_createTranscript();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [createTranscript]
};
