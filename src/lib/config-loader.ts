import { resolve } from 'path';
import { existsSync } from 'fs';
import { EOL } from 'os';
import { logger, isPrimitives } from './utils';

export default function loadConfig(file: string | undefined, baseDir: string): object | never {
	let configFilePath = 'alo.{env}.js';

	if (file) {
		configFilePath = resolve(process.cwd(), file);
	} else {
		configFilePath = resolve(baseDir, configFilePath.replace(/{env}/g, process.env.ALO_ENV || 'dev'));
	}

	if (!existsSync(configFilePath)) {
		logger.error(`${configFilePath} not found.`);
		process.exit(1);
	}

	const configFileExposed = require(configFilePath);
	let configuration: object | null = null;

	if (typeof configFileExposed === 'function') {
		try {
			configuration = configFileExposed();
		} catch (e) {
			logger.error(`Error in ${configFilePath} when execute the exposed function. The reason is:${EOL}${e.message}`);
			process.exit(1);
		}
	} else if (!isPrimitives(configFileExposed)) {
		configuration = configFileExposed;
	} else {
		logger.error(`Aloridal expected an object or a function in ${configFilePath} but ${configFileExposed} was found.`);
		process.exit(1);
	}

	logger.success(`Load ${configFilePath} success.`);

	return configuration!;
}