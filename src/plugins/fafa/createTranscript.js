module.exports = {
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
        d.aoiError.fnError(d, "custom", { }, "you require discord-html-transcripts to use this, install it with `npm i discord-html-transcripts`");
    }

    const discordTranscripts = require("discord-html-transcripts");
    let channelid = await d.util.getChannel(d, channel);
    let logging = await d.util.getChannel(d, logchannel);
    const attachment = await discordTranscripts.createTranscript(channelid, {
      filename: "transcript.html",
      saveImages: true,
      poweredBy: false,
    });

    const f = await logging.send({
      files: [attachment],
    });

    data.result = f;
    return {
      code: d.util.setCode(data),
    };
  },
};
