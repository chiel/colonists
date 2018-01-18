export function setChits(chits) {
	return { type: setChits.type, chits };
}
setChits.type = 'colonists/chits/set';
