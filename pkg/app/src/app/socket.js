let socket$;

export function setSocket(socket) {
	socket$ = socket;
}

export function sendMessage(msg) {
	socket$.next(JSON.stringify(msg));
}
