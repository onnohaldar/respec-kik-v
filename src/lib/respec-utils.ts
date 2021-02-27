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
 
const SUMMARY_MD = 'SUMMARY.md';
const IDENT_NR = 2;
const MD_SECTIONS_TEMPLATE = '<=% mdSections %>';

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

    // assemble (sub)sections from summary
    // and process ResPec requirements for Mark Down content
    let mdSections = '';
    let summaryLineNr = 0;

    for (const summaryLine of summaryLines) {
        // extract data from content
        const sectionId = extractSectionId(summaryLine);
        const dataInclude = extractDataInclude(summaryLine);
        // generate new HTML section
        mdSections += parseSection(sectionId, dataInclude);
        // read Mark Down Content from input directory
        let mdContentStr = readFileSync(join(mdContentPath, dataInclude), 'utf-8');

        if (summaryLineNr == 0 || summaryLineNr == summaryLines.length - 1) {
            // Abstract and Conformance Mark Dow must be without Headers (already supplied by ResPec)
            mdContentStr = removeMdHeader(mdContentStr);
        }

        // write Mark Down Content to output directory
        writeFileSync(join(resPecOutputPath, dataInclude), mdContentStr);
        // next summary line to process
        summaryLineNr ++;
    }
    
    // write parsed content in template to output directory
    writeFileSync(outputHtmlIndexFilePath, parsedHtmlIndexStr.replace(MD_SECTIONS_TEMPLATE, mdSections));
}

function removeMdHeader(mdFileStr: string) {
    return mdFileStr.split('\n')
        .filter(mdLine => !mdLine.startsWith('# '))
            .join('\n');
}

/**
 * <section id="inleiding" data-format="markdown" data-include="README.md"><h2></h2></section>
 * @param sectionLevel 
 * @param sectionId 
 * @param dataInclude 
 */
function parseSection(sectionId: string, dataInclude: string) {
    // Parse Mark Down Values in HTML Template String

    if (sectionId == 'abstract' || sectionId == 'conformance') {
        return `<section id="${sectionId}"><div data-format="markdown" data-include="${dataInclude}"></div></section>\n`;
    } else {
        return `<section data-format="markdown" data-include="${dataInclude}"><h2></h2></section>\n`;
    }

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