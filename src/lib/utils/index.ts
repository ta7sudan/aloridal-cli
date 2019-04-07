import figlet from 'figlet';
import { resolve, dirname } from 'path';
import pkg from '../../../package.json';
import cleaner from './cleaner';
import * as logger from './logger';
import { existsSync } from 'fs';



type PromiseData = [undefined, any];

type PromiseError = [any, undefined];

export type Callable = (...args: any[]) => any;

export type AsyncCallable = (...args: any[]) => Promise<any>;

export const isAsyncFunction = (fn: any): fn is AsyncCallable => fn[Symbol.toStringTag] === 'AsyncFunction';

export const to = (p: Promise<any>): Promise<PromiseData | PromiseError> => p.then((data: any): PromiseData => [undefined, data]).catch((err: any): PromiseError => [err, undefined]);

export const sleep = (time: number): Promise<any> => new Promise<any>((rs: any): any => setTimeout(rs, time));

export const getAbsolutePath = (rel: string): string => resolve(process.cwd(), rel);

export const getCmds = (): string[] => Object.keys(pkg.bin);

export const getFiglet = (cmd: string): Promise<string> => new Promise<string>((rs: any, rj: any): void => {
	figlet(cmd, {
		horizontalLayout: 'fitted'
	}, (err: Error | null, data?: string): void => {
		if (err) {
			rj(err);
		} else {
			rs(data);
		}
	});
});

let PROJECT_ROOT: string | undefined;

export function findProjectRoot(currentPath: string = process.cwd()): string | undefined {
	if (PROJECT_ROOT) {
		return PROJECT_ROOT;
	}
	const testPath = resolve(currentPath, 'package.json');
	if (existsSync(testPath)) {
		PROJECT_ROOT = currentPath;
		return PROJECT_ROOT
	} else if (currentPath === dirname(currentPath)) {
		return;
	} else {
		return findProjectRoot(dirname(currentPath));
	}
}

export { logger, cleaner };
