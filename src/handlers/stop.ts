import { Arguments } from 'yargs';

export default function stop(argv: Arguments): void {
	console.log('stop');
	console.log(argv);
};