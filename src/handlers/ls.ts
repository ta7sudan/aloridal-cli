import { Arguments } from 'yargs';

export default function ls(argv: Arguments): void {
	console.log('ls');
	console.log(argv);
};