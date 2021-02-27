'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cpx = require('cpx');

/**
 * ResPec Utils
 */
/**
 * Local Library Imports
 */
function parseMd2ResPec(resPecTemplatePath, mdContentPath, resPecOutputPath) {
    // init ResPec output with template to parse
    cpx.copySync(resPecTemplatePath + "/**/*", resPecOutputPath);
    console.log(mdContentPath);
}

exports.parseMd2ResPec = parseMd2ResPec;
