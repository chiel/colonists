import { ajax } from 'rxjs/observable/dom/ajax';
import XHR2 from 'xhr2';

export default function request(url, options = {}) {
	if (!options.headers) {
		options.headers = {};
	}

	if (!options.headers['Content-Type']) {
		options.headers['Content-Type'] = 'application/json; charset=UTF-8';
	}

	return ajax({
		url,
		createXHR: () => new XHR2(),
		crossDomain: true,
		...options,
	});
}
