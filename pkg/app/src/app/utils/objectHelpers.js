export function deepGet(obj, key) {
	let o = obj;
	const path = key.split('.');
	while (path.length) {
		const k = path.shift();
		if (!o[k]) return undefined;
		o = o[k];
	}

	return o;
}

export function immutableDeepSet(obj, key, value) {
	const newObj = { ...obj };
	let o = newObj;

	const path = key.split('.');
	while (path.length) {
		const k = path.shift();

		if (!path.length) {
			o[k] = value;
		} else {
			o[k] = { ...o[k] };
			o = o[k];
		}
	}

	return newObj;
}
