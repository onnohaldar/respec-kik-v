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
const IDENT_NR = 2;
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

    // initialize list with summary lines (all lines that start with * or spaces and *)
    const summaryLines = summaryMdStr.split('\n').filter(mdLine => mdLine.trimStart().startsWith('*'));

    // assamble string with (sub)sections
    let sections = '';
    let hasAbstract = false;
    let hasConformance = false;

    for (const summaryLine of summaryLines) {
        sections += parseSection(summaryLine);
    }

    console.log(sections);
    
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

function parseSection(summaryLine: string) {
    // calculate section level
    let sectionLevel = 2;
    const levelIdentSpace = ' '.repeat(IDENT_NR);
    let summaryLineIndent = levelIdentSpace;

    while (summaryLine.startsWith(summaryLineIndent)) {
        sectionLevel ++;
            summaryLineIndent += levelIdentSpace;
    }

    // Parse Mark Down Values in HTML Template String
    return `
    <section id="${extractSectionId(summaryLine)}" data-format="markdown" data-include="${extractDataInclude(summaryLine)}">
        <h${sectionLevel}></h${sectionLevel}>
        <! -- Section Genereated by ResPecMd CLI see https://github.com/onnohaldar/respec-tools -->
    </section>
    `;
}

function extractSectionId(summaryLine: string) {
    return summaryLine.split('[')[1].split(']')[0].toLowerCase();
}

function extractDataInclude(summaryLine: string) {
    return summaryLine.split('(')[1].split(')')[0];
}