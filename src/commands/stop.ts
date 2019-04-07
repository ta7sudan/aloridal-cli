import { Argv } from 'yargs';
import { getCmds } from '../lib/utils';
import handler from '../handlers/stop';


const create = {
	command: 'stop [application]',
	desc: 'stop an application or all application',
	builder(yargs: Argv): Argv {
		return yargs
			.example(
				`${getCmds()[0]} stop my-app`,
				'stop an application named my-app'
			);
	},
	handler
};

module.exports = create;
