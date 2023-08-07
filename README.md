# aoi.js-library

A plugin library for aoi.js that adds more functions to your aoi.js bot.

## Installation

You can install the package using npm:

```shell
npm install aoi.js-library
```

## Setup 

```javascript
const { AoiClient } = require("aoi.js");
const { PluginManager } = require("aoi.js-library");

const bot = new AoiClient({
    token: "DISCORD BOT TOKEN",
    prefix: "DISCORD BOT PREFIX",
    intents: ["MessageContent", "Guilds", "GuildMessages"],
    events: ["onMessage"],
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        tables: ["main"],
        path: "./database/",
        extraOptions: {
            dbType: "KeyValue"
        }
    }
});

// Ping Command
bot.command({
    name: "ping",
    code: `Pong! $pingms`
});

new PluginManager(bot).loadPlugins("default/comment",); //Loads the from the default folder ($comment function)
```


## Plugins

The Plugins class provides a way to load and manage plugins for your Discord bot.

To load plugins:

```javascript
new PluginManager(bot).loadPlugins("author/function",);

```

To load specific plugins:

```javascript
new PluginManager(bot).loadPlugins("default/comment",);
```

By adding this function in the field, it'll only **enable $comment**, it supports an multiple array if provided otherwise ignored.

## Add your plugins to the library

To add your plugins to the library, you can add via **Pull Request** on the **[GitHub Repository](https://github.com/Leref/aoi.js-library/pulls)**.


### [Available Plugins](https://github.com/Leref/aoi.js-library/tree/main/plugins)
