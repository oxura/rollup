module.exports = {
	input: 'main.js',
	output: {
		format: 'cjs',
		banner: `/*${'x'.repeat(1024 * 1024)}*/`
	}
};
