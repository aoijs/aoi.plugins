const optionHandlers = [
    { name: "djs", code: async (data) => { try { data.setOption('djs', data.value === 'true'); } catch (err) { } } },
    { name: "awaited", code: async (data) => { try { data.setOption('awaited', data.value === 'true'); } catch (err) { } } },
    { name: "react", code: async (data) => { try {
        for (var reaction of [data.value, ...data.oargs]) {
            data.d.message.react(reaction).catch((err) => {
                console.log("Error adding reaction "+reaction+": \n"+err)
            });
        };
        } catch (err) { }
     } 
    },
    {
        name: "wait",
        code: async (data) => { try {
            const timeValue = data.value ? parseInt(data.value) : 5;
            const timeUnit = data.value ? data.value.replace(timeValue.toString(), '') : 's';
            switch (timeUnit) {
                case 'ms':
                    data.setOption("waitTime", timeValue);
                    break;
                case 's':
                    data.setOption("waitTime", timeValue * 1000);
                    break;
                case 'm':
                    data.setOption("waitTime", timeValue * 60 * 1000);
                    break;
                case 'h':
                    data.setOption("waitTime", timeValue * 60 * 60 * 1000);
                    break;
                default:
                    break;
            }
        } catch (err) { }
        }
    }
];

module.exports = {
    name: "$betterEval",
    type: "djs",
    author: "lordex",
    version: ["6.4.0"],
    description: "Eval function with options.",
    example: "$betterEval[code]",
    code: async (d) => {
        const data = d.util.aoiFunc(d);
        var [code] = data.inside.splits;
        code = code.split(" ");

        var options = {
            djs: false,
            awaited: false,
            waitTime: 0
        };

        const filteredCode = code.filter(arg => {
            if (arg.startsWith('--')) {
                const [optionName, optionValue, ...otheroptions] = arg.substring(2).split('#COLON#');
                const optionHandler = optionHandlers.find(handler => handler.name === optionName);
                if (optionHandler) {
                    optionHandler.code({
                        d: d,
                        value: optionValue,
                        option: options,
                        oargs: otheroptions,
                        setOption: async function (name, value) {
                            try {
                                options[name] = value
                            } catch (err) {
                                console.log("Error setting option "+name+": \n"+error);
                            }
                        }
                    });
                    return false;
                }
            }
            return true;
        });

        let joinedCode = filteredCode.join(" ");
        if (filteredCode.length === 0) {
            joinedCode = data.inside.splits.slice(1).join(" ");
        }

        if (options.djs) {
            if (options.awaited) {
                if (options.waitTime && options.waitTime > 0) {
                    try {
                        setTimeout(() => {
                            d.interpreter(d.client, d.message, d.args, {
                                "name": "betterEval",
                                "code": `$if[$get[fresult_t83r4]!=undefined;$get[fresult_t83r4]]
$let[fresult_t83r4;$djsEval[(async function () {\n${joinedCode}\n})();true]]`
                            });
                        }, options.waitTime);
                    } catch (err) {
                        d.message.channel.send(`\`\`\`\nAoiEval Error: ${err}\n- Code:\n${joinedCode}\`\`\``);
                    }
                } else {
                    try {
                        d.interpreter(d.client, d.message, d.args, {
                            "name": "betterEval",
                            "code": `$if[$get[fresult_t83r4]!=undefined;$get[fresult_t83r4]]
$let[fresult_t83r4;$djsEval[(async function () {\n${joinedCode}\n})();true]]`
                        });
                    } catch (err) {
                        d.message.channel.send(`\`\`\`\nAoiEval Error: ${err}\n- Code:\n${joinedCode}\`\`\``);
                    }
                }
            } else {
                if (options.waitTime && options.waitTime > 0) {
                    try {
                        setTimeout(() => {
                            d.interpreter(d.client, d.message, d.args, {
                                "name": "betterEval",
                                "code": `$if[$get[fresult_t83r4]!=undefined;$get[fresult_t83r4]]
$let[fresult_t83r4;$djsEval[${joinedCode};true]]`
                            });
                        }, options.waitTime);
                    } catch (err) {
                        d.message.channel.send(`\`\`\`\nAoiEval Error: ${err}\n- Code:\n${joinedCode}\`\`\``);
                    }
                } else {
                    try {
                        d.interpreter(d.client, d.message, d.args, {
                            "name": "betterEval",
                            "code": `$if[$get[fresult_t83r4]!=undefined;$get[fresult_t83r4]]
$let[fresult_t83r4;$djsEval[${joinedCode};true]]`
                        });
                    } catch (err) {
                        d.message.channel.send(`\`\`\`\nAoiEval Error: ${err}\n- Code:\n${joinedCode}\`\`\``);
                    }
                }
            }
        } else {
            if (options.waitTime && options.waitTime > 0) {
                try {
                    setTimeout(() => {
                        d.interpreter(d.client, d.message, d.args, {
                            "name": "betterEval",
                            "code": `$eval[${joinedCode}]`
                        });
                    }, options.waitTime);
                } catch (err) {
                    d.message.channel.send(`\`\`\`\nAoiEval Error: ${err}\n- Code:\n${joinedCode}\`\`\``);
                }
            } else {
                try {
                    d.interpreter(d.client, d.message, d.args, {
                        "name": "betterEval",
                        "code": `$eval[${joinedCode}]`
                    }, d.client.db);
                } catch (err) {
                    d.message.channel.send(`\`\`\`\nAoiEval Error: ${err}\n- Code:\n${joinedCode}\`\`\``);
                }
            }
        }

        return {
            code: d.util.setCode(data)
        };
    }
  };