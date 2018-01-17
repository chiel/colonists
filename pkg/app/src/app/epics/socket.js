import { webSocket } from 'rxjs/observable/dom/webSocket';

import { queueJoined, queueReady } from '../actions/queue';
import { closeSocket, openSocket } from '../actions/socket';
import { setSocket } from '../socket';

const wsUrl = typeof window !== 'undefined'
	? window.ENV.API_URL.replace(/^http/, 'ws')
	: undefined;

const actionMap = {
	'queue:joined': queueJoined,
	'queue:ready': queueReady,
};

export function openEpic(action$) {
	return action$.ofType(openSocket.type)
		.switchMap(() => {
			const socket$ = webSocket(wsUrl);
			setSocket(socket$);
			return socket$;
		})
		.map(({ type, ...payload }) => actionMap[type](payload))
		.catch(error => {
			console.error('ERROR', error);
			return closeSocket();
		});
}
