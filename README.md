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

const pluginManager = new PluginManager(bot);

pluginManager.loadPlugins(
    "default/os",
    "default/comment",
)   // Load all Plugins Functions from aoi.js-library 

```

### Add via command line interface

You can also add plugins via the command line interface.

```shell
npx aoilib add default/os default/comment
```
> * this will add the plugins to `aoijs.plugins` file

now the setup will be changed to:

```diff

const pluginManager = new PluginManager(bot);

- pluginManager.loadPlugins(
-     "default/os",
-     "default/comment",
- ); // Load all Plugins Functions from aoi.js-library 

+ pluginManager.load();

```


## Plugins

The Plugins class provides a way to load and manage plugins for your Discord bot.

To load plugins: 

```javascript
pluginManager.loadPlugins(
    "default/os",
    "default/comment",
)
```
or
```javascript
pluginManager.load(); // if plugins are added via command line interface

```

## Create your own plugins

to create your own plugins you can use the command line interface.

```shell
npx aoilib create username/pluginname
```
this will generate a boilerplate project for your plugin.

after adding your code to the plugin you can prepare it for library by using the command line interface.

```shell
npx aoilib bundle username/pluginname
```

this will generate a bundle file for your plugin which can be used in the library.


## Add plugins to the library


To add your plugins to the library, you can add via **Pull Request** on the **[GitHub Repository](https://github.com/Leref/aoi.js-library/pulls)**.


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

### [Available Plugins](https://github.com/Leref/aoi.js-library/tree/main/plugins)