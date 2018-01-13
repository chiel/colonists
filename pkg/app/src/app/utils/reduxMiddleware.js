import { browserHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import { applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import epic from '../epics';
import api from '../utils/api';
import { setCookie } from '../utils/cookie';

export default applyMiddleware(
	routerMiddleware(browserHistory),
	createEpicMiddleware(epic, {
		dependencies: { api, push, setCookie },
	}),
);
