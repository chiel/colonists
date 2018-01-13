import jwt from 'jsonwebtoken';

import { findUser } from '../lib/user';

const salt = process.env.AUTH_TOKEN_SALT;

export default async function authMiddleware(req, res, next) {
	const header = req.header('authorization');
	if (!header) {
		const err = new Error('Missing Authorization header');
		err.status = 403;
		err.type = 'auth:missing_header';
		return next(err);
	}

	const m = header.match(/^Bearer (.*)$/);
	if (!m) {
		const err = new Error('Authorization header has the wrong format');
		err.status = 403;
		err.type = 'auth:invalid_header';
		return next(err);
	}

	const token = m[1];
	const payload = jwt.decode(token);
	if (!payload) {
		const err = new Error('Invalid token provided');
		err.status = 403;
		err.type = 'auth:invalid_token';
		return next(err);
	}

	const user = await findUser(payload.sub);
	const secret = user.providers[payload.provider].id;

	jwt.verify(token, salt + secret, err => {
		if (err) {
			const err = new Error('Invalid token provided');
			err.status = 403;
			err.type = 'auth:invalid_token';
			return next(err);
		}

		req.user = user;
		next();
	});
}
