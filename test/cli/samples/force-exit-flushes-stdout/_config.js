const assert = require('node:assert/strict');

module.exports = defineTest({
	description: 'flushes piped stdout before forcing the process to exit',
	spawnArgs: ['--config', '--forceExit', '--silent'],
	result(code) {
		const module = { exports: {} };
		new Function('module', code)(module);
		assert.equal(module.exports, 42);
	}
});
