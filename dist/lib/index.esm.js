import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { copySync } from 'cpx';

/**
 * ResPec Utils
 */
/**
 * Constant Values
 */
var SUMMARY_MD = 'SUMMARY.md';
var MD_SECTIONS_TEMPLATE = '<=% mdSections %>';
function parseMd2ResPec(resPecTemplatePath, mdContentPath, resPecOutputPath) {
    // init ResPec output with template and content to parse
    copySync(resPecTemplatePath + "/**/*", resPecOutputPath);
    copySync(mdContentPath + "/**/*", resPecOutputPath);
    // read template to parse
    var outputHtmlIndexFilePath = join(resPecOutputPath, 'index.html');
    var parsedHtmlIndexStr = readFileSync(outputHtmlIndexFilePath, 'utf-8');
    // read content to parse
    var summaryMdStr = readFileSync(join(resPecOutputPath, SUMMARY_MD), 'utf-8');
    // initialize list with summary lines (all lines that start with * or spaces and *)
    var summaryLines = summaryMdStr.split('\n').filter(function (mdLine) { return mdLine.trimStart().startsWith('*'); });
    // check ResPec first section requirements
    var abstractLineNr = summaryLines.findIndex(function (mdLine) { return extractSectionId(mdLine) == 'abstract'; });
    if (abstractLineNr != 0) {
        throw new Error('ResPecMd CLI - SUMMARY.md must start with a "* [Abstract](file path to ABSTRACT.md)" Section!');
    }
    // check ResPec last section requirements
    var conformanceLineNr = summaryLines.findIndex(function (mdLine) { return extractSectionId(mdLine) == 'conformance'; });
    if (conformanceLineNr != summaryLines.length - 1) {
        throw new Error('ResPecMd CLI - SUMMARY.md must end with a "* [Conformance](file path to CONFORMANCE.md)" Section!');
    }
    // assemble (sub)sections from summary
    // and process ResPec requirements for Mark Down content
    var mdSections = '';
    var summaryLineNr = 0;
    for (var _i = 0, summaryLines_1 = summaryLines; _i < summaryLines_1.length; _i++) {
        var summaryLine = summaryLines_1[_i];
        // extract data from content
        var sectionId = extractSectionId(summaryLine);
        var dataInclude = extractDataInclude(summaryLine);
        // generate new HTML section
        mdSections += parseSection(sectionId, dataInclude);
        // read Mark Down Content from input directory
        var mdContentStr = readFileSync(join(mdContentPath, dataInclude), 'utf-8');
        if (summaryLineNr == 0 || summaryLineNr == summaryLines.length - 1) {
            // Abstract and Conformance Mark Dow must be without Headers (already supplied by ResPec)
            mdContentStr = removeMdHeader(mdContentStr);
        }
        // write Mark Down Content to output directory
        writeFileSync(join(resPecOutputPath, dataInclude), mdContentStr);
        // next summary line to process
        summaryLineNr++;
    }
    // write parsed content in template to output directory
    writeFileSync(outputHtmlIndexFilePath, parsedHtmlIndexStr.replace(MD_SECTIONS_TEMPLATE, mdSections));
}
function removeMdHeader(mdFileStr) {
    return mdFileStr.split('\n')
        .filter(function (mdLine) { return !mdLine.startsWith('# '); })
        .join('\n');
}
/**
 * <section id="inleiding" data-format="markdown" data-include="README.md"><h2></h2></section>
 * @param sectionLevel
 * @param sectionId
 * @param dataInclude
 */
function parseSection(sectionId, dataInclude) {
    // Parse Mark Down Values in HTML Template String
    if (sectionId == 'abstract' || sectionId == 'conformance') {
        return "<section id=\"" + sectionId + "\"><div data-format=\"markdown\" data-include=\"" + dataInclude + "\"></div></section>\n";
    }
    else {
        return "<section data-format=\"markdown\" data-include=\"" + dataInclude + "\"><h2></h2></section>\n";
    }
}
function extractSectionId(summaryLine) {
    return extractData(summaryLine, '[', ']').toLowerCase();
}
function extractDataInclude(summaryLine) {
    return extractData(summaryLine, '(', ')');
}
function extractData(content, startId, endId) {
    return content.split(startId)[1].split(endId)[0];
}

export { parseMd2ResPec };
