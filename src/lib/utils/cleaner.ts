import { logger } from '.';

export default {
	child: null as any,
	cleanup(msg?: any): void {
		logger.info(`kill child with ${msg}...`);
		this.child.kill(msg);
	}
};