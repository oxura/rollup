const assert = require('node:assert/strict');

module.exports = defineTest({
	description: 'resolves returned branches after local declarations without suppressing TDZ errors',
	options: {
		plugins: [
			{
				name: 'check-unused-dependency',
				generateBundle(options, bundle) {
					for (const chunk of Object.values(bundle)) {
						if (chunk.type === 'chunk') {
							assert.ok(!Object.keys(chunk.modules).some(id => id.endsWith('/unused.js')));
						}
					}
				}
			}
		]
	},
	exports(exports) {
		assert.equal(exports.conditional(), false);
		assert.equal(exports.logicalAnd(), 'equal');
		assert.equal(exports.logicalOr(), true);
		assert.equal(exports.arrow(), false);
		assert.throws(() => exports.conditionalTdz(), ReferenceError);
		assert.throws(() => exports.logicalTdz(), ReferenceError);
		assert.equal(exports.mutable(false), 'no');
		assert.equal(exports.mutable(true), 'yes');
	}
});
