import { push } from 'react-router-redux';

import { queueJoin, queueReady } from '../actions/queue';
import { sendMessage } from '../socket';

export function queueJoinEpic(action$) {
	return action$.ofType(queueJoin.type)
		.do(() => {
			sendMessage({ type: 'queue:join' });
		})
		.ignoreElements();
}
