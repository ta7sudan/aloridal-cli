"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const figures = tslib_1.__importStar(require("figures"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
exports.error = (msg) => console.error(chalk_1.default.red(`${figures.cross} ${msg}`));
exports.success = (msg) => console.log(`${chalk_1.default.green(figures.tick)} ${msg}`);
exports.warn = (msg) => console.warn(`${chalk_1.default.red(figures.warning)} ${chalk_1.default.yellow(msg)}`);
//# sourceMappingURL=logger.js.map