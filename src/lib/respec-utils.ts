/**
 * ResPec Utils
 */

/**
 * Node Package Imports
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
//import { default as marked } from 'marked';
import { copySync } from 'cpx';

/**
 * Local Library Imports
 */


export function parseMd2ResPec(resPecTemplatePath: string, mdContentPath: string, resPecOutputPath: string) {
    // init ResPec output with template to parse
    copySync(`${resPecTemplatePath}/**/*`, resPecOutputPath);
    
    // read template to parse
    const outputHtmlIndexFilePath = join(resPecOutputPath, 'index.html');
    let parsedHtmlIndexStr = readFileSync(outputHtmlIndexFilePath, 'utf-8');

    // read content to parse
    const abstractMdStr = readFileSync(join(mdContentPath, 'ABSCTRACT.md'), 'utf-8');
    const summaryMdStr = readFileSync(join(mdContentPath, 'SUMMARY.md'), 'utf-8');
    const conformanceMdStr = readFileSync(join(mdContentPath, 'CONFORMANCE.md'), 'utf-8');

    // parse content
    const parsedAbstractStr = abstractMdStr.split('/n');
    console.log('parsedAbstractStr =');
    console.log(parsedAbstractStr);

    // write parsed content
    writeFileSync(outputHtmlIndexFilePath, parsedHtmlIndexStr);


}