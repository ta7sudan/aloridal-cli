import { Arguments } from 'yargs';
import { findProjectRoot, logger } from '../lib/utils';
import { resolve } from 'path';
import { existsSync } from 'fs';


export default function start(argv: Arguments): void {
	const { config, env } = argv as { [k: string]: string };
	const environment = env === 'development' ?  process.env.NODE_ENV || env : env;
	let configFileName = 'alo.{env}.js';

	if (config) {
		configFileName = resolve(process.cwd(), config);
	} else {
		const projectRoot = findProjectRoot();
		if (!projectRoot) {
			logger.error(`package.json not found in ${process.cwd()} and parent directory.`);
			process.exit(1);
		}
		configFileName = resolve(projectRoot!, configFileName.replace(/{env}/g, environment));
	}
	if (!existsSync(configFileName)) {
		logger.error(`${configFileName} not found.`);
		process.exit(1);
	}
	const configuration = require(configFileName);
	// TODO
	console.log(configuration);
};