import { setChits } from '../actions/chits';

export default function chitsReducer(state = {}, action) {
	if (action.type === setChits.type) {
		return action.chits;
	}

	return state;
}
