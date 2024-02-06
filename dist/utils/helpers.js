"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginUrl = void 0;
const getPluginUrl = async (username, plugin) => `https://raw.githubusercontent.com/AkaruiDevelopment/aoi.plugins/main/plugins/${username}/${plugin}/._bundle.js`;
exports.getPluginUrl = getPluginUrl;
