#!/usr/bin/env node
setInterval(() => {
	console.log('test');
}, 1000);
setTimeout(() => {
	(process as any).send('start-ready');
}, 30000);

process.once('exit', () => {
	console.log('bbb');
});

// setTimeout(() => process.exit(0), 5000);