"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const figlet_1 = tslib_1.__importDefault(require("figlet"));
const path_1 = require("path");
const package_json_1 = tslib_1.__importDefault(require("../../../package.json"));
const cleaner_1 = tslib_1.__importDefault(require("./cleaner"));
exports.cleaner = cleaner_1.default;
const logger = tslib_1.__importStar(require("./logger"));
exports.logger = logger;
const fs_1 = require("fs");
exports.isAsyncFunction = (fn) => fn[Symbol.toStringTag] === 'AsyncFunction';
exports.to = (p) => p.then((data) => [undefined, data]).catch((err) => [err, undefined]);
exports.sleep = (time) => new Promise((rs) => setTimeout(rs, time));
exports.getAbsolutePath = (rel) => path_1.resolve(process.cwd(), rel);
exports.getCmds = () => Object.keys(package_json_1.default.bin);
exports.getFiglet = (cmd) => new Promise((rs, rj) => {
    figlet_1.default(cmd, {
        horizontalLayout: 'fitted'
    }, (err, data) => {
        if (err) {
            rj(err);
        }
        else {
            rs(data);
        }
    });
});
let PROJECT_ROOT;
function findProjectRoot(currentPath = process.cwd()) {
    if (PROJECT_ROOT) {
        return PROJECT_ROOT;
    }
    const testPath = path_1.resolve(currentPath, 'package.json');
    if (fs_1.existsSync(testPath)) {
        PROJECT_ROOT = currentPath;
        return PROJECT_ROOT;
    }
    else if (currentPath === path_1.dirname(currentPath)) {
        return;
    }
    else {
        return findProjectRoot(path_1.dirname(currentPath));
    }
}
exports.findProjectRoot = findProjectRoot;
//# sourceMappingURL=index.js.map