"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../lib/utils");
const start_1 = tslib_1.__importDefault(require("../handlers/start"));
const create = {
    command: 'start [options]',
    desc: 'start an application',
    builder(yargs) {
        return yargs
            .option('C', {
            alias: 'config',
            describe: 'specified an config file, will ignore the --env option',
            string: true,
            default: ''
        })
            .option('E', {
            alias: 'env',
            describe: 'set environment',
            string: true,
            default: 'development'
        })
            .example(`${utils_1.getCmds()[0]} start -E production`, 'start an application in production environment');
    },
    handler: start_1.default
};
module.exports = create;
//# sourceMappingURL=start.js.map