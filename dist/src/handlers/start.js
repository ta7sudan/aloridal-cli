"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../lib/utils");
const path_1 = require("path");
const fs_1 = require("fs");
const os_1 = require("os");
function startMaster(cmdOptions, clusterOptions) {
    // TODO
    console.log(cmdOptions);
    console.log(clusterOptions);
}
function start(argv) {
    const { config, workers, node, timeout, env, daemon } = argv, baseDir = utils_1.findProjectRoot();
    let configFileName = 'alo.{env}.js';
    // 默认dev, 其他的根据用户输入决定, ALO_ENV决定了配置文件选择
    process.env.ALO_ENV = env;
    // 默认env如果不是dev的话, 则都视为服务器环境, NODE_ENV决定了针对服务器环境的调整, 比如日志
    !process.env.NODE_ENV && (process.env.NODE_ENV = env === 'dev' ? 'development' : 'production');
    if (!baseDir) {
        utils_1.logger.error(`package.json not found in ${process.cwd()} and parent directory.`);
        process.exit(1);
        // return触发类型保护
        return;
    }
    if (config) {
        configFileName = path_1.resolve(process.cwd(), config);
    }
    else {
        configFileName = path_1.resolve(baseDir, configFileName.replace(/{env}/g, process.env.ALO_ENV));
    }
    if (!fs_1.existsSync(configFileName)) {
        utils_1.logger.error(`${configFileName} not found.`);
        process.exit(1);
    }
    const configFileExposed = require(configFileName);
    let configuration = null;
    if (typeof configFileExposed === 'function') {
        try {
            configuration = configFileExposed();
        }
        catch (e) {
            utils_1.logger.error(`Error in ${configFileName} when execute the exposed function. The reason is:${os_1.EOL}${e.message}`);
            process.exit(1);
        }
    }
    else if (!utils_1.isPrimitives(configFileExposed)) {
        configuration = configFileExposed;
    }
    else {
        utils_1.logger.error(`Aloridal expected an object or a function in ${configFileName} but ${configFileExposed} was found.`);
        process.exit(1);
    }
    utils_1.logger.success(`Load ${configFileName} success.`);
    const cmdOptions = {
        workers,
        node: node === 'node' ? node : path_1.resolve(baseDir, node),
        timeout,
        daemon,
        baseDir: baseDir
    };
    startMaster(cmdOptions, configuration);
}
exports.default = start;
;
//# sourceMappingURL=start.js.map