/**
 * ResPec Utils
 */

/**
 * Node Package Imports
 */
import { readFileSync, writeFileSync } from 'fs';
const markdownJson = require('markdown-json');
import { copySync } from 'cpx';

/**
 * Local Library Imports
 */


export function parseMd2ResPec(resPecTemplatePath: string, mdContentPath: string, resPecOutputPath: string) {
    // init ResPec output with template to parse
    copySync(`${resPecTemplatePath}/**/*`, resPecOutputPath);
    
    // parse md content
    const settings = {
        name: 'markdown-json',
      	cwd: './',
      	src: mdContentPath,
        filePattern: '**/*.md',
        ignore: "*(icon|input)*",
//        dist: 'output/',
        metadata: true,
        server: false,
//        port: 3001
    };

    markdownJson(settings).then((data) => {
        console.log('data:', data);
    }).catch((err) => {
        console.log('error:', err);
    })

}