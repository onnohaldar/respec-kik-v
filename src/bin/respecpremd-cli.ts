#!/usr/bin/env node
"use strict"

/**
 * Node Package Modules
 */
import { argv } from 'process';
import * as Colors from 'colors';

/**
 * CLI Library Modules
 */
import { parseMd2ResPec } from '../lib'

/**
 * colors constant that is used for console.log()
 * Based on <https://www.voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/>
 */
const colors = Colors;

//
// START CLI Script
//

if (argv[4] || !argv[5]) {
    parseMd2ResPec(argv[2], argv[3], argv[4]);
} else {
    console.error('excact 3 parms needed: mdContentPath, resPecTemplatePath, resPecOutputPath');
}

