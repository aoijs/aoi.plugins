"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// plugins/fafa/tesseract/tesseract.js
var require_tesseract = __commonJS({
  "plugins/fafa/tesseract/tesseract.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      name: "$tesseract",
      type: "djs",
      author: "fafa",
      version: ["6.4.0", "6.5.0"],
      description: "Returns the image text content.",
      example: "$tesseract[https://cdn.discordapp.com/attachments/832704676096245800/1139659988164419714/image.png;eng;true]",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [url, language, logging = false] = data.inside.splits;
        let ready;
        try {
          require("tesseract");
          ready = true;
        } catch (e) {
          ready = false;
        }
        if (ready === false) {
          d.aoiError.fnError(
            d,
            "custom",
            {},
            "you require tesseract.js to use this, install it with `npm i tesseract.js`"
          );
        }
        const { createWorker } = require("tesseract.js");
        var languages = [
          "afr",
          "amh",
          "ara",
          "asm",
          "aze",
          "aze_cyrl",
          "bel",
          "ben",
          "bod",
          "bos",
          "bul",
          "cat",
          "ceb",
          "ces",
          "chi_sim",
          "chi_tra",
          "chr",
          "cym",
          "dan",
          "deu",
          "dzo",
          "ell",
          "eng",
          "enm",
          "epo",
          "est",
          "eus",
          "fas",
          "fin",
          "fra",
          "frk",
          "frm",
          "gle",
          "glg",
          "grc",
          "guj",
          "hat",
          "heb",
          "hin",
          "hrv",
          "hun",
          "iku",
          "ind",
          "isl",
          "ita",
          "ita_old",
          "jav",
          "jpn",
          "kan",
          "kat",
          "kat_old",
          "kaz",
          "khm",
          "kir",
          "kor",
          "kur",
          "lao",
          "lat",
          "lav",
          "lit",
          "mal",
          "mar",
          "mkd",
          "mlt",
          "msa",
          "mya",
          "nep",
          "nld",
          "nor",
          "ori",
          "pan",
          "pol",
          "por",
          "pus",
          "ron",
          "rus",
          "san",
          "sin",
          "slk",
          "slv",
          "spa",
          "spa_old",
          "sqi",
          "srp",
          "srp_latn",
          "swa",
          "swe",
          "syr",
          "tam",
          "tel",
          "tgk",
          "tgl",
          "tha",
          "tir",
          "tur",
          "uig",
          "ukr",
          "urd",
          "uzb",
          "uzb_cyrl",
          "vie",
          "yid"
        ];
        if (!languages.includes(language)) {
          return d.aoiError.fnError(d, "custom", {}, "language");
        }
        if (!url) {
          return d.aoiError.fnError(d, "custom", {}, "url");
        }
        let workerConfig = {};
        if (logging === "true") {
          workerConfig.logger = (h) => console.log(h);
        }
        const worker = await createWorker(workerConfig);
        await worker.loadLanguage(language);
        await worker.initialize(language);
        const {
          data: { text }
        } = await worker.recognize(url);
        await worker.terminate();
        data.result = text;
        return {
          code: d.util.setCode(data)
        };
      }
    };
  }
});

// plugins/fafa/tesseract/package.json
var require_package = __commonJS({
  "plugins/fafa/tesseract/package.json"(exports2, module2) {
    module2.exports = {
      name: "@fafa/tesseract",
      version: "1.0.0",
      dependencies: {
        tesseract: "^0.0.3",
        "tesseract.js": "^4.1.1"
      }
    };
  }
});

// plugins/fafa/tesseract/index.js
var tesseract = require_tesseract();
module.exports = {
  pkgJson: require_package(),
  load: [],
  commands: {
    pre: [],
    post: []
  },
  events: [],
  functions: [tesseract]
};
