"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_1 = require("../lib/utils");
const stop_1 = tslib_1.__importDefault(require("../handlers/stop"));
const create = {
    command: 'stop [application]',
    desc: 'stop an application or all application',
    builder(yargs) {
        return yargs
            .example(`${utils_1.getCmds()[0]} stop my-app`, 'stop an application named my-app');
    },
    handler: stop_1.default
};
module.exports = create;
//# sourceMappingURL=stop.js.map