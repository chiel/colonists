import { queueJoin } from '../actions/queue';

export const initialState = {
	pending: false,
};

export default function queueReducer(state = initialState, action) {
	if (action.type === queueJoin.type) {
		return {
			...state,
			pending: true,
		};
	}

	return state;
}
