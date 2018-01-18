import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import chits from './chits';
import login from './login';
import match from './match';
import session from './session';

export default combineReducers({
	chits,
	login,
	match,
	routing,
	session,
});
