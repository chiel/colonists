import { ajax } from 'rxjs/observable/dom/ajax';
import xhr2 from 'xhr2';

const apiUrl = typeof window !== 'undefined'
	? window.ENV.API_URL
	: process.env.API_URL_SERVER;

const XHR2 = typeof XMLHttpRequest !== 'undefined'
	? XMLHttpRequest
	: xhr2;

export default function api(endpoint, options = {}) {
	if (!options.headers) {
		options.headers = {};
	}

	return ajax({
		createXHR: () => new XHR2(),
		url: `${apiUrl}${endpoint}`,
		...options,
		crossDomain: true,
		headers: {
			...options.headers,
			'Content-Type': 'application/json; charset=UTF-8',
		},
	});
}
