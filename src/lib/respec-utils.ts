/**
 * ResPec Utils
 */

/**
 * Node Package Imports
 */
import { readFileSync, writeFileSync } from 'fs';
//const jdown = require('jdown');
import jdown from '';
import { copySync } from 'cpx';

/**
 * Local Library Imports
 */


export function parseMd2ResPec(resPecTemplatePath: string, mdContentPath: string, resPecOutputPath: string) {
    // init ResPec output with template to parse
    copySync(`${resPecTemplatePath}/**/*`, resPecOutputPath);
    
    jdown(mdContentPath, {  }).then(content => console.log(content));


}