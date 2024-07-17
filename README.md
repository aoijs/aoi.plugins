<h1 align="center">@aoijs/aoi.plugins</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@aoijs/aoi.plugins">
    <img src="https://img.shields.io/npm/v/@aoijs/aoi.plugins?style=for-the-badge"  alt="aoi.plugins"/>
  </a>
  <a href="https://www.npmjs.com/package/@aoijs/aoi.plugins">
    <img src="https://img.shields.io/npm/dt/@aoijs/aoi.plugins?style=for-the-badge"  alt="aoi.plugins"/>
  </a>

## Installation

You can install the package using npm:

```shell
npm install @aoijs/aoi.plugins
```

## Setup

```javascript
const {AoiClient} = require("aoi.js");
const {PluginManager} = require("@aoijs/aoi.plugins");

const bot = new AoiClient({
    token: "DISCORD BOT TOKEN",
    prefix: "DISCORD BOT PREFIX",
    intents: ["MessageContent", "Guilds", "GuildMessages"],
    events: ["onMessage"],
    database: {
        type: "aoi.db",
        db: require("@aoijs/aoi.db"),
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

pluginManager.loadPlugins("default/comment"); //Loads the from the default folder ($comment function)
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

To create your own plugins you can use the command line interface.

```shell
npx aoilib create username/pluginname
```

This will generate a boilerplate project for your plugin.

After adding your code to the plugin you can prepare it for library by using the command line interface.

```shell
npx aoilib bundle username/pluginname
```

This will generate a bundle file for your plugin which can be used in the library.

## Add plugins to the library

To add your plugins to the library, you can add via **Pull Request** on the **[GitHub Repository](https://github.com/aoijs/aoi.plugins/pulls)**.

## Add plugins via command line interface

You can also add plugins via the command line interface.

```shell
npx aoilib add default/os default/comment
```

This will add the plugins to `aoijs.plugins` file

As well the setup **must change** if you this method.

```diff
const pluginManager = new PluginManager(bot);

- pluginManager.loadPlugins(
-     "default/os",
-     "default/comment",
- ); // Load all Plugins Functions from @aoijs/aoi.plugins 

+ pluginManager.load();
```

### [Available Plugins](https://github.com/aoijs/aoi.plugins/tree/main/plugins)