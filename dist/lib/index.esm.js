import { copySync } from 'cpx';

/**
 * ResPec Utils
 */
/**
 * Local Library Imports
 */
function parseMd2ResPec(resPecTemplatePath, mdContentPath, resPecOutputPath) {
    // init ResPec output with template to parse
    copySync(resPecTemplatePath + "/**/*", resPecOutputPath);
    console.log(mdContentPath);
}

export { parseMd2ResPec };
