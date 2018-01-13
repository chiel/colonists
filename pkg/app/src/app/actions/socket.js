export function closeSocket() {
	return { type: closeSocket.type };
}
closeSocket.type = 'colonists/socket/close';

export function openSocket() {
	return { type: openSocket.type };
}
openSocket.type = 'colonists/socket/open';
