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

const ABSTRACT_MD = 'ABSTRACT.md'; 
const SUMMARY_MD = 'SUMMARY.md';
const SUMMARY_IDENT = '  ';
const CONFORMANCE_MD = 'CONFORMANCE.md';

export function parseMd2ResPec(resPecTemplatePath: string, mdContentPath: string, resPecOutputPath: string) {
    // init ResPec output with template to parse
    copySync(`${resPecTemplatePath}/**/*`, resPecOutputPath);
    
    // read template to parse
    const outputHtmlIndexFilePath = join(resPecOutputPath, 'index.html');
    let parsedHtmlIndexStr = readFileSync(outputHtmlIndexFilePath, 'utf-8');

    // read content to parse
    const abstractMdStr = readFileSync(join(mdContentPath, ABSTRACT_MD), 'utf-8');
    const conformanceMdStr = readFileSync(join(mdContentPath, CONFORMANCE_MD), 'utf-8');
    const summaryMdStr = readFileSync(join(mdContentPath, SUMMARY_MD), 'utf-8');

    // parse content
    // remove header from abstract
    const parsedAbstractStr = removeMdHeader(abstractMdStr);
    const parsedConformanceStr = removeMdHeader(conformanceMdStr);

    const summaryLines = summaryMdStr.split('\n').filter(mdLine => mdLine.trimStart().startsWith('*'));

    for (const summaryLine of summaryLines) {
        console.log(summaryLine);
        let htmlHeaderLevel = 2;
        let summaryLineIndent = SUMMARY_IDENT;

        while (summaryLine.startsWith(summaryLineIndent)) {
            htmlHeaderLevel ++;
            summaryLineIndent += SUMMARY_IDENT;
        }

        console.log('htmlHeaderLevel =', htmlHeaderLevel);

    }
    
    // write parsed content
    writeFileSync(join(resPecOutputPath, ABSTRACT_MD), parsedAbstractStr);
    writeFileSync(join(resPecOutputPath, CONFORMANCE_MD), parsedConformanceStr);
    writeFileSync(outputHtmlIndexFilePath, parsedHtmlIndexStr);


}

function removeMdHeader(mdFileStr: string) {
    return mdFileStr.split('\n')
        .filter(mdLine => !mdLine.startsWith('# '))
            .join('\n');
}