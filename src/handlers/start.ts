import { Arguments } from 'yargs';
import { findProjectRoot, logger, cleaner, sleep } from '../lib/utils';
import { resolve, basename } from 'path';
import loadConfig from '../lib/config-loader';
import execa, { StdIOOption, ExecaChildProcess } from 'execa';

// type Signals =
// 	"SIGABRT" | "SIGALRM" | "SIGBUS" | "SIGCHLD" | "SIGCONT" | "SIGFPE" | "SIGHUP" | "SIGILL" | "SIGINT" | "SIGIO" |
// 	"SIGIOT" | "SIGKILL" | "SIGPIPE" | "SIGPOLL" | "SIGPROF" | "SIGPWR" | "SIGQUIT" | "SIGSEGV" | "SIGSTKFLT" |
// 	"SIGSTOP" | "SIGSYS" | "SIGTERM" | "SIGTRAP" | "SIGTSTP" | "SIGTTIN" | "SIGTTOU" | "SIGUNUSED" | "SIGURG" |
// 	"SIGUSR1" | "SIGUSR2" | "SIGVTALRM" | "SIGWINCH" | "SIGXCPU" | "SIGXFSZ" | "SIGBREAK" | "SIGLOST" | "SIGINFO";
interface CommandLineOptions {
	workers: number;
	node: string;
	timeout: number;
	daemon: boolean;
	baseDir: string;
}


async function startMaster(cmdOptions: CommandLineOptions, clusterOptions: object): Promise<any> {
	const { workers, node, timeout, daemon: isDaemon, baseDir } = cmdOptions;
	const appName = (clusterOptions as any).name || require(resolve(baseDir, 'package.json')).name || basename(baseDir);
	const bin = resolve(__dirname, '../lib/start-cluster.js');
	let isReady = false;

	async function checkStatus(child: ExecaChildProcess): Promise<any> {
		let count = 0;
		const expectedCount = timeout / 1000;
		while (!isReady) {
			if (count >= expectedCount) {
				child.kill('SIGTERM');
				logger.error(`Start failed, ${expectedCount}s timeout`);
				await sleep(1000);
				process.exit(1);
			}
			++count;
			await sleep(1000);
		}
	}

	!(clusterOptions as any).name && ((clusterOptions as any).name = appName);
	!(clusterOptions as any).workers && ((clusterOptions as any).workers = workers);

	const $clusterOptions = JSON.stringify(clusterOptions);

	logger.info(`Using node.js ${node}`);
	logger.info(`Starting application ${appName}...`);

	if (isDaemon) {
		const processObtions = {
			// 这个没什么用, 只是为了方便
			execArgv: process.execArgv,
			cwd: baseDir,
			env: process.env,
			stdio: ['ignore', 'pipe', 'pipe', 'ipc'] as ReadonlyArray<StdIOOption>,
			detached: true,
			cleanup: false,
			timeout
		};

		const child = execa(node, [...process.execArgv, bin, $clusterOptions], processObtions);
		child.on('message', (msg: string): void => {
			if (msg === 'start-ready') {
				isReady = true;
				child.unref();
				child.disconnect();
				logger.success(`${appName} started.`);
				process.exit(0);
			}
		});

		cleaner.child = child;

		await checkStatus(child);
	} else {
		const processObtions = {
			execArgv: process.execArgv,
			cwd: baseDir,
			env: process.env,
			stdio: ['inherit', 'inherit', 'inherit', 'ipc'] as ReadonlyArray<StdIOOption>,
			detached: false,
			// 好像没什么必要, 或者我自己不去手动kill它
			cleanup: true,
			timeout
		};

		const child = execa(node, [...process.execArgv, bin, $clusterOptions], processObtions);
		child.once('exit', (code: number): void => {
			if (code !== 0) {
				logger.error(`execute '${[node, ...process.execArgv, bin, $clusterOptions].join(' ')}' failed, exit code ${code}`);
			} else {
				logger.success('child process exit success.');
			}
		});

		// 前面已经注册过这些事件了, 
		// 这里只需要收集下子进程就好
		cleaner.child = child;
		// ['SIGHUP', 'SIGQUIT', 'SIGINT', 'SIGTERM'].forEach(signal => {
		// 	process.addListener(signal as Signals, () => {
		// 		logger.info(`kill child with ${signal}...`);
		// 		child.kill(signal);
		// 		process.exit(0);
		// 	});
		// });
	}
}

export default function start(argv: Arguments): void {
	const { config, workers, node, timeout, env, daemon } = argv as { [k: string]: any },
		baseDir = findProjectRoot();

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

	const configuration = loadConfig(config, baseDir);

	const cmdOptions: CommandLineOptions = {
		workers,
		node: node === 'node' ? node : resolve(baseDir, node),
		timeout,
		daemon,
		baseDir: baseDir!
	};

	startMaster(cmdOptions, configuration!);
};