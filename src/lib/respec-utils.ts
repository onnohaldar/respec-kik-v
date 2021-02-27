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
    const summaryMdStr = readFileSync(join(mdContentPath, SUMMARY_MD), 'utf-8');

    // initialize list with summary lines (all lines that start with * or spaces and *)
    const summaryLines = summaryMdStr.split('\n').filter(mdLine => mdLine.trimStart().startsWith('*'));

    // check ResPec first section requirements
    const abstractLineNr = summaryLines.findIndex(mdLine => extractSectionId(mdLine) == 'abstract');
    if (abstractLineNr != 0) {
        throw new Error('ResPecMd CLI - SUMMARY.md must start with a "* [Abstract](file path to ABSTRACT.md)" Section!');
    }

    // check ResPec last section requirements
    const conformanceLineNr = summaryLines.findIndex(mdLine => extractSectionId(mdLine) == 'conformance');
    if (conformanceLineNr != summaryLines.length - 1) {
        throw new Error('ResPecMd CLI - SUMMARY.md must end with a "* [Conformance](file path to CONFORMANCE.md)" Section!');
    }

    // remove headers from abstract and conformance (already supplied by ResPec)
    const abstractMdStr = readFileSync(join(mdContentPath, extractDataInclude(summaryLines[abstractLineNr])), 'utf-8');
    const conformanceMdStr = readFileSync(join(mdContentPath, CONFORMANCE_MD), 'utf-8');
    const parsedAbstractStr = removeMdHeader(abstractMdStr);
    const parsedConformanceStr = removeMdHeader(conformanceMdStr);

    // assamble string with (sub)sections
    let sections = '';
    let lineNr = 0;

    for (const summaryLine of summaryLines) {
        // extract data from content
        const sectionLevel = extractSectionLevel(summaryLine);
        const sectionId = extractSectionId(summaryLine);
        const dataInclude = extractDataInclude(summaryLine);
        // generate new HTML section
        sections += parseSection(sectionLevel, sectionId, dataInclude);
        // read Mark Down Content from input directory
        let mdContentStr = readFileSync(join(mdContentPath, dataInclude), 'utf-8');

        if (lineNr == 0 || lineNr == summaryLines.length - 1) {
            // Abstract and Conformance Mark Dow must be without Headers (already supplied by ResPec)
            mdContentStr = removeMdHeader(mdContentStr);
        }

        // write Mark Down Content to output directory
        writeFileSync(join(resPecOutputPath, dataInclude), mdContentStr);
        // increment line number
        lineNr ++;
    }

    console.log(sections);
    
    // write parsed content in template to output directory
    writeFileSync(outputHtmlIndexFilePath, parsedHtmlIndexStr);
}

function removeMdHeader(mdFileStr: string) {
    return mdFileStr.split('\n')
        .filter(mdLine => !mdLine.startsWith('# '))
            .join('\n');
}

function parseSection(sectionLevel: number, sectionId: string, dataInclude: string) {
    // Parse Mark Down Values in HTML Template String
    return `
    <section id="${sectionId}" data-format="markdown" data-include="${dataInclude}">
        <h${sectionLevel}></h${sectionLevel}>
        <! -- Section Genereated by ResPecMd CLI see https://github.com/onnohaldar/respec-tools -->
    </section>
    `;
}

function extractSectionLevel(summaryLine: string) {
    // calculate section level
    let sectionLevel = 2;
    const levelIdentSpace = ' '.repeat(IDENT_NR);
    let summaryLineIndent = levelIdentSpace;

    while (summaryLine.startsWith(summaryLineIndent)) {
        sectionLevel ++;
            summaryLineIndent += levelIdentSpace;
    }

    return sectionLevel;
}

function extractSectionId(summaryLine: string) {
    return extractData(summaryLine, '[', ']').toLowerCase();
}

function extractDataInclude(summaryLine: string) {
    return extractData(summaryLine, '(', ')');
}

function extractData(content: string, startId: string, endId: string) {
    return content.split(startId)[1].split(endId)[0];
}