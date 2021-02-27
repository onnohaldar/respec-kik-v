#!/usr/bin/env node
"use strict"

/**
 * Node Package Modules
 */
import { argv } from 'process';

/**
 * CLI Library Modules
 */
import { parseMd2ResPec } from '../lib'

//
// START CLI Script
//

if (argv[4] || !argv[5]) {
    parseMd2ResPec(argv[2], argv[3], argv[4]);
} else {
    console.error('excact 3 parms needed: resPecTemplatePath, mdContentPath, resPecOutputPath');
}

