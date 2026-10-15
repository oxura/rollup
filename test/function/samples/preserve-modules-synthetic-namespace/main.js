import * as dep from './dep.js';

assert.equal(dep.foo(dep), 'bar');
assert.deepEqual(Object.keys(dep).sort(), ['bar', 'default', 'foo']);
assert.equal(Object.getPrototypeOf(dep), null);
