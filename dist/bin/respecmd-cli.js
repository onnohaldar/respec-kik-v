#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Node Package Modules
 */
const process_1 = require("process");
/**
 * CLI Library Modules
 */
const lib_1 = require("../lib");
//
// START CLI Script
//
if (process_1.argv[4] || !process_1.argv[5]) {
    lib_1.parseMd2ResPec(process_1.argv[2], process_1.argv[3], process_1.argv[4]);
}
else {
    console.error('excact 3 parms needed: resPecTemplatePath, mdContentPath, resPecOutputPath');
}
