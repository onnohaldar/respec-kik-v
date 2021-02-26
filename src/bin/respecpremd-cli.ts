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

/**
 * colors constant that is used for console.log()
 * Based on <https://www.voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/>
 */
const colors = Colors;

//
// START CLI Script
//
let parms: string[] = [];



console.log(`KIK-V - ${command} ${parms}`.bgRed.yellow.bold);

