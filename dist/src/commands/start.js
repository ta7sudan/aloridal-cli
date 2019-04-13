"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../lib/utils");
const start_1 = tslib_1.__importDefault(require("../handlers/start"));
const os_1 = require("os");
const create = {
    command: 'start [options]',
    desc: 'start an application',
    builder(yargs) {
        return yargs
            .option('C', {
            alias: 'config',
            describe: 'specified an config file, will ignore the --env option',
            string: true
        })
            .option('W', {
            alias: 'workers',
            describe: 'number of workers',
            number: true,
            default: os_1.cpus().length
        })
            .option('N', {
            alias: 'node',
            describe: 'customize node command path',
            string: true,
            default: 'node',
            coerce(val) {
                return val === '' ? 'node' : val;
            }
        })
            .option('T', {
            alias: 'timeout',
            describe: 'the maximun timeout when app starts',
            number: true,
            default: 300 * 1000
        })
            .option('E', {
            alias: 'env',
            describe: 'set environment, can access by ALO_ENV not NODE_ENV',
            string: true,
            default: 'dev',
            coerce(val) {
                return val === '' ? 'dev' : val;
            }
        })
            .option('D', {
            alias: 'daemon',
            describe: 'whether run at background daemon mode',
            boolean: true,
            default: false
        })
            .example(`${utils_1.getCmds()[0]} start -E production`, 'start an application in production environment');
    },
    handler: start_1.default
};
module.exports = create;
//# sourceMappingURL=start.js.map