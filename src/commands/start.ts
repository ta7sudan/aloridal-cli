import { Argv } from 'yargs';
import { getCmds } from '../lib/utils';
import handler from '../handlers/start';

const create = {
	command: 'start [options]',
	desc: 'start an application',
	builder(yargs: Argv): Argv {
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
			.example(
				`${getCmds()[0]} start -E production`,
				'start an application in production environment'
			);
	},
	handler
};

module.exports = create;
