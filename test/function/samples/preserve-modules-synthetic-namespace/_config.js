module.exports = defineTest({
	description: 'preserves synthetic namespace members when preserving modules',
	options: {
		output: { exports: 'named', preserveModules: true },
		plugins: [
			{
				name: 'synthetic-exports',
				transform(code, id) {
					if (id.endsWith('/dep.js')) {
						return { code, syntheticNamedExports: true };
					}
				}
			}
		]
	}
});
