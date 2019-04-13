import { Argv } from 'yargs';
import { getCmds } from '../lib/utils';
import handler from '../handlers/start';
import { cpus } from 'os';

const create = {
	command: 'start [options]',
	desc: 'start an application',
	builder(yargs: Argv): Argv {
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
				default: cpus().length
			})
			.option('N', {
				alias: 'node',
				describe: 'customize node command path',
				string: true,
				default: 'node',
				coerce(val: any): any {
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
				coerce(val: any): any {
					return val === '' ? 'dev' : val;
				}
			})
			.option('D', {
				alias: 'daemon',
				describe: 'whether run at background daemon mode',
				boolean: true,
				default: false
			})
			.example(
				`${getCmds()[0]} start -E production`,
				'start an application in production environment'
			);
	},
	handler
};

module.exports = create;
