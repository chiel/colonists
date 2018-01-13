import '../app/styles/base.css';

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore } from 'redux';

import reducer from '../app/reducers';
import routes from '../app/routes';
import reduxMiddleware from '../app/utils/reduxMiddleware';

const store = createStore(reducer, window.INITIAL_STATE, reduxMiddleware);
window.store = store;

const history = syncHistoryWithStore(browserHistory, store);

hydrate(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
	document.getElementById('app-root'),
);
