# aoi.js-library

A plugin library for aoi.js that adds more functions to your aoi.js bot.

## Installation

You can install the package using npm:

```shell
npm aoi.js-library
```

## Setup 

```javascript
const { AoiClient } = require("aoi.js");
const { Plugins } = require("aoi.js-library");

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

new Plugins({ bot }).loadPlugins(); // Load all Plugins Functions from aoi.js-library 
```


## Plugins

The Plugins class provides a way to load and manage plugins for your Discord bot.

To load all available plugins:

```javascript
new Plugins({ bot }).loadPlugins();

```

To load specific plugins:

```javascript
new Plugins({ bot }).loadPlugins(['$comment']);
```

By adding this function in the field, it'll only **enable $comment**, it supports an multiple array if provided otherwise ignored.

## Add your plugins to the library

To add your plugins to the library, you can add via **Pull Request** on the **[GitHub Repository](https://github.com/Leref/aoi.js-library/pulls)**.

## User Plugins

The UserPlugins class allows you to load user-specific plugins for your Discord bot from a directory of your choice.

To load user plugins: 

```javascript
new UserPlugins({ bot }).loadUserPlugins('path');
```

Replace `path` with the actual path to the directory where your user plugins are located.

### User Plugin Structure

User plugins must be in the following format:

**plugin.js** (path/plugin.js)

```javascript
module.exports = {
    name: "Plugin Name", //$pluginName
    type: "Plugin Type", //aoi.js or djs
    code: `Plugin Code` //pluginCode
}
```

### Example User Plugin (aoi.js)

```javascript
module.exports = {
    name: "$lerefIcon", //$pluginName
    type: "aoi.js", //aoi.js or djs
    params: [], //aoi.js params
    code: `$lerefAvatar` //pluginCode
}
```

### [Available Plugins](https://github.com/Leref/aoi.js-library/tree/main/src/plugins)