const assert = require('node:assert/strict');
const { SourceMapConsumer } = require('source-map');
const getLocation = require('../../getLocation');

const sourcesContent = ['export const foo = 1;', 'export const bar = 2;'];

module.exports = defineTest({
	description: 'preserves multiple transform sources through subsequent transformations',
	options: {
		output: { name: 'bundle' },
		plugins: [
			{
				name: 'combine-sources',
				transform() {
					return {
						code: sourcesContent.join('\n'),
						map: {
							version: 3,
							names: [],
							sourceRoot: 'original',
							sources: ['foo.js', 'bar.js'],
							sourcesContent,
							mappings: [[[0, 0, 0, 0]], [[0, 1, 0, 0]]]
						}
					};
				}
			},
			{
				name: 'prepend-comment',
				async transform(code) {
					const { default: MagicString } = await import('magic-string');
					const transformed = new MagicString(code).prepend('// transformed\n');
					const { mappings, names, version } = transformed.generateMap({ hires: true });
					return {
						code: transformed.toString(),
						map: JSON.stringify({ mappings, names, version })
					};
				}
			}
		]
	},
	async test(code, map) {
		assert.deepEqual(
			map.sources.map(source => source.split('/').pop()),
			['foo.js', 'bar.js']
		);
		assert.deepEqual(map.sourcesContent, sourcesContent);
		const consumer = await new SourceMapConsumer(map);
		for (const name of ['foo', 'bar']) {
			const position = consumer.originalPositionFor(getLocation(code, code.indexOf(`${name} =`)));
			assert.ok(position.source.endsWith(`/original/${name}.js`));
			assert.equal(position.line, 1);
			assert.equal(position.column, 0);
		}
		consumer.destroy();
	}
});
