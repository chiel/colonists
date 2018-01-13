export function getCookie(key) {
	const re = new RegExp(`${encodeURIComponent(key)}=([^;]+)(?:;|$)`);
	const m = re.exec(document.cookie);
	if (!m) return '';
	return m[1];
}

export function setCookie(key, value, ttl) {
	const cookie = [`${key}=${value}`, 'path=/'];

	if (ttl) {
		if (ttl === Infinity) {
			cookie.push('expires=Fri, 31 Dec 9999 23:59:59 GMT');
		} else {
			cookie.push(`max-age=${ttl}`);
		}
	}

	document.cookie = cookie.join('; ');
}
