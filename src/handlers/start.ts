import { Arguments } from 'yargs';
import { findProjectRoot, logger, isPrimitives } from '../lib/utils';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { EOL } from 'os';

interface CommandLineOptions {
	workers: number;
	node: string;
	timeout: number;
	daemon: boolean;
	baseDir: string;
}

function startMaster(cmdOptions: CommandLineOptions, clusterOptions: object): void {
	// TODO
	console.log(cmdOptions);
	console.log(clusterOptions);
}

export default function start(argv: Arguments): void {
	const { config, workers, node, timeout, env, daemon } = argv as { [k: string]: any },
		baseDir = findProjectRoot();
	let configFileName = 'alo.{env}.js';

	// 默认dev, 其他的根据用户输入决定, ALO_ENV决定了配置文件选择
	process.env.ALO_ENV = env;
	// 默认env如果不是dev的话, 则都视为服务器环境, NODE_ENV决定了针对服务器环境的调整, 比如日志
	!process.env.NODE_ENV && (process.env.NODE_ENV = env === 'dev' ? 'development' : 'production');

	if (!baseDir) {
		logger.error(`package.json not found in ${process.cwd()} and parent directory.`);
		process.exit(1);
		// return触发类型保护
		return;
	}

	if (config) {
		configFileName = resolve(process.cwd(), config);
	} else {
		configFileName = resolve(baseDir, configFileName.replace(/{env}/g, process.env.ALO_ENV!));
	}

	if (!existsSync(configFileName)) {
		logger.error(`${configFileName} not found.`);
		process.exit(1);
	}

	const configFileExposed = require(configFileName);
	let configuration: object | null = null;

	if (typeof configFileExposed === 'function') {
		try {
			configuration = configFileExposed();
		} catch (e) {
			logger.error(`Error in ${configFileName} when execute the exposed function. The reason is:${EOL}${e.message}`);
			process.exit(1);
		}
	} else if (!isPrimitives(configFileExposed)) {
		configuration = configFileExposed;
	} else {
		logger.error(`Aloridal expected an object or a function in ${configFileName} but ${configFileExposed} was found.`);
		process.exit(1);
	}

	logger.success(`Load ${configFileName} success.`);

	const cmdOptions: CommandLineOptions = {
		workers,
		node: node === 'node' ? node : resolve(baseDir, node),
		timeout,
		daemon,
		baseDir: baseDir!
	};
	startMaster(cmdOptions, configuration!);
	
};