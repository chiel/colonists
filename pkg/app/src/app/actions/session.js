export function setUser(user) {
	return { type: setUser.type, user };
}
setUser.type = 'colonists/session/set_user';
