import { queueReady } from '../actions/queue';

export default function matchReducer(state = {}, action) {
	if (action.type === queueReady.type) {
		return { ...action.payload.match };
	}

	return state;
}
