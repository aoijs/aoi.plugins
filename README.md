# aoi.js-library

A feature-rich library for building Discord bots with aoi.js

## Installation

You can install the package using npm:

```shell
npm aoi.js-library
```

## Setup 

```javascript
const {AoiClient} = require("aoi.js");
const { Plugins, UserPlugins } = require("aoi.js-library");

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
new Plugins({ bot }).loadPlugins(['$os', '$comment']);
```

## User Plugins

The UserPlugins class allows you to load user-specific plugins for your Discord bot with a directory provided.

To load user plugins: 

```javascript
new UserPlugins({ bot }).loadUserPlugins('path');
```
