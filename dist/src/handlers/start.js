"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../lib/utils");
const path_1 = require("path");
const fs_1 = require("fs");
function start(argv) {
    const { config, env } = argv;
    const environment = env === 'development' ? process.env.NODE_ENV || env : env;
    let configFileName = 'alo.{env}.js';
    if (config) {
        configFileName = path_1.resolve(process.cwd(), config);
    }
    else {
        const projectRoot = utils_1.findProjectRoot();
        if (!projectRoot) {
            utils_1.logger.error(`package.json not found in ${process.cwd()} and parent directory.`);
            process.exit(1);
        }
        configFileName = path_1.resolve(projectRoot, configFileName.replace(/{env}/g, environment));
    }
    if (!fs_1.existsSync(configFileName)) {
        utils_1.logger.error(`${configFileName} not found.`);
        process.exit(1);
    }
    const configuration = require(configFileName);
    // TODO
    console.log(configuration);
}
exports.default = start;
;
//# sourceMappingURL=start.js.map