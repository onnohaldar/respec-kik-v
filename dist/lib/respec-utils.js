"use strict";
/**
 * ResPec Utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMd2ResPec = void 0;
/**
 * Node Package Imports
 */
//import { readFileSync, writeFileSync } from 'fs';
//import { default as marked } from 'marked';
const cpx_1 = require("cpx");
/**
 * Local Library Imports
 */
function parseMd2ResPec(resPecTemplatePath, mdContentPath, resPecOutputPath) {
    // init ResPec output with template to parse
    cpx_1.copySync(`${resPecTemplatePath}/**/*`, resPecOutputPath);
    console.log(mdContentPath);
}
exports.parseMd2ResPec = parseMd2ResPec;
