import { createStore } from 'redux';

import reducer from '../../app/reducers';

export default function createStoreMiddleware(req, res, next) {
	req.store = createStore(reducer);
	next();
}
