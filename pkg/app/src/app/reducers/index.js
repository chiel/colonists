import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import login from './login';
import match from './match';
import session from './session';

export default combineReducers({
	login,
	match,
	routing,
	session,
});
