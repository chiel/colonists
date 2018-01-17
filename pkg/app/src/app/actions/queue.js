export function queueJoin() {
	return { type: queueJoin.type };
}
queueJoin.type = 'colonists/queue/join';

export function queueJoined() {
	return { type: queueJoined.type };
}
queueJoined.type = 'colonists/queue/joined';

export function queueReady(payload) {
	return { type: queueReady.type, payload };
}
queueReady.type = 'colonists/queue/ready';
