"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginUrl = void 0;
const getPluginUrl = async (username, plugin) => `https://raw.githubusercontent.com/Leref/aoi.js-library/main/plugins/${username}/${plugin}/._bundle.js`;
exports.getPluginUrl = getPluginUrl;
