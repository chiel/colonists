import handleApiError from './handleApiError';

import { setChits } from '../../app/actions/chits';
import api from '../../app/utils/api';

let cache;

export default function cacheChitsMiddleware(req, res, next) {
	if (cache) {
		req.store.dispatch(setChits(cache));
		return next();
	}

	api('/data/chits', { method: 'GET' })
		.subscribe(
			({ response }) => {
				cache = response;
				req.store.dispatch(setChits(cache));
				next();
			},
			response => handleApiError(response, next),
		);
}
