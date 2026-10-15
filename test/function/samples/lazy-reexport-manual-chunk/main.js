assert.equal(isLoaded(), false);

export const promise = import('./dep1.js').then(({ dep2 }) => {
	assert.equal(dep2, 'dep2');
	assert.equal(isLoaded(), true);
});
