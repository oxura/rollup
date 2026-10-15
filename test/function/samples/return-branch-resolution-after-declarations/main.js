import { unused } from './unused.js';

export function conditional() {
	const a = false;
	const b = false;
	return a !== b ? unused : false;
}

export function logicalAnd() {
	const a = 0;
	const b = 0;
	return (a !== b && unused) || 'equal';
}

export function logicalOr() {
	const a = 0;
	const b = 0;
	return a === b || unused;
}

export const arrow = () => {
	var a = 0;
	var b = 0;
	return a === b ? false : unused;
};

export function conditionalTdz() {
	return value ? true : false;
	const value = false;
}

export function logicalTdz() {
	return value || true;
	const value = false;
}

export function mutable(flag) {
	let value = false;
	if (flag) value = true;
	return value ? 'yes' : 'no';
}
