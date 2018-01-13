import { login, loginError, loginSuccess } from '../actions/login';

export const initialState = {
	error: '',
	pending: false,
};

export default function loginReducer(state = initialState, action) {
	if (action.type === login.type) {
		return {
			...state,
			error: '',
			pending: true,
		};
	}

	if (action.type === loginSuccess.type) {
		return {
			...state,
			error: '',
			pending: false,
		};
	}

	if (action.type === loginError.type) {
		return {
			...state,
			error: action.error,
			pending: false,
		};
	}

	return state;
}
