export function login(id, username) {
	return { type: login.type, id, username };
}
login.type = 'colonists/login/login';

export function loginSuccess(user) {
	return { type: loginSuccess.type, user };
}
loginSuccess.type = 'colonists/login/login_success';

export function loginError(error) {
	return { type: loginError.type, error };
}
loginError.type = 'colonists/login/login_error';
