"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../lib/utils");
const ls_1 = tslib_1.__importDefault(require("../handlers/ls"));
const create = {
    command: 'ls [application]',
    desc: 'show status of application',
    builder(yargs) {
        return yargs
            .example(`${utils_1.getCmds()[0]} ls my-app`, 'show status of my-app');
    },
    handler: ls_1.default
};
module.exports = create;
//# sourceMappingURL=ls.js.map