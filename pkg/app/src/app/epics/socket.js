import { webSocket } from 'rxjs/observable/dom/webSocket';

import { joinQueue } from '../actions/queue';
import { closeSocket, openSocket } from '../actions/socket';

const wsUrl = typeof window !== 'undefined'
	? window.ENV.API_URL.replace(/^http/, 'ws')
	: undefined;

let socket$;

function sendMessage(msg) {
	socket$.next(JSON.stringify(msg));
}

export function openEpic(action$) {
	return action$.ofType(openSocket.type)
		.switchMap(() => {
			socket$ = webSocket(wsUrl);
			return socket$;
		})
		.catch(() => closeSocket());
}

export function joinQueueEpic(action$) {
	return action$.ofType(joinQueue.type)
		.do(() => {
			sendMessage({ type: 'queue:join' });
		})
		.ignoreElements();
}
