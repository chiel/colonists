import { setUser } from '../actions/session';

export const initialState = {
	user: null,
};

export default function sessionReducer(state = initialState, action) {
	if (action.type === setUser.type) {
		return {
			...state,
			user: action.user,
		};
	}

	return state;
}
