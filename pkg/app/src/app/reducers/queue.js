import { joinQueue } from '../actions/queue';

export const initialState = {
	pending: false,
};

export default function queueReducer(state = initialState, action) {
	if (action.type === joinQueue.type) {
		return {
			...state,
			pending: true,
		};
	}

	return state;
}
