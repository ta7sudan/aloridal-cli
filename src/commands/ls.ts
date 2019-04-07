import { Argv } from 'yargs';
import { getCmds } from '../lib/utils';
import handler from '../handlers/ls';


const create = {
	command: 'ls [application]',
	desc: 'show status of application',
	builder(yargs: Argv): Argv {
		return yargs
			.example(
				`${getCmds()[0]} ls my-app`,
				'show status of my-app'
			);
	},
	handler
};

module.exports = create;
