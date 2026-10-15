let loaded = false;

module.exports = defineTest({
	description: 'does not eagerly load manual dependencies of an empty dynamic entry',
	context: {
		isLoaded: () => loaded,
		markLoaded: () => {
			loaded = true;
		}
	},
	options: {
		output: {
			manualChunks(id) {
				if (id.endsWith('/dep2.js')) return 'manual-dep2';
			}
		}
	},
	async exports({ promise }) {
		await promise;
	}
});
