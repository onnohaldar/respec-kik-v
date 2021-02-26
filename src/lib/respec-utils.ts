/**
 * ResPec Utils
 */

/**
 * Node Package Imports
 */
import { readFileSync, writeFileSync } from 'fs';
import * as markdownJson from 'markdown-json';
import { copySync } from 'cpx';

/**
 * Local Library Imports
 */


export function parseMd2ResPec(mdContentPath: string, resPecTemplatePath: string, resPecOutputPath: string) {
    copySync(`${mdContentPath}/**/*`, resPecOutputPath);

}