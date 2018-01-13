import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs/Observable';

import { collection } from '../db';
import request from '../utils/request';

const salt = process.env.AUTH_TOKEN_SALT;

function getPublicUser(user) {
	const u = { ...user };
	u.id = u._id;
	delete u._id;
	delete u.providers;
	return u;
}

function getLoginURL(provider, redirectURL) {
	return [
		'https://accounts.google.com/o/oauth2/v2/auth',
		'?scope=email',
		'&response_type=code',
		'&access_type=online',
		`&client_id=${process.env.AUTH_GOOGLE_CLIENT_ID}`,
		`&redirect_uri=${encodeURIComponent(redirectURL)}`,
	].join('');
}

function getAccessToken(provider, redirectURL, code) {
	return request('https://www.googleapis.com/oauth2/v4/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		body: [
			`code=${encodeURIComponent(code)}`,
			`client_id=${encodeURIComponent(process.env.AUTH_GOOGLE_CLIENT_ID)}`,
			`client_secret=${encodeURIComponent(process.env.AUTH_GOOGLE_CLIENT_SECRET)}`,
			`redirect_uri=${encodeURIComponent(redirectURL)}`,
			'grant_type=authorization_code',
		].join('&'),
	})
		.map(({ response }) => response.access_token);
}

function getUser(provider, token) {
	return request('https://www.googleapis.com/plus/v1/people/me', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.map(({ response }) => ({
			id: response.id,
			first_name: response.name.givenName,
			last_name: response.name.familyName,
			email: response.emails.find(({ type }) => type === 'account').value,
			image: `${response.image.url}0`,
		}));
}

function createOrFindUser(provider, { id, ...user }) {
	return Observable.create(async observer => {
		user.providers = { google: { id } };
		user.created_at = new Date();
		const coll = await collection('user');
		coll.findAndModify(
			{ providers: { google: { id } } },
			null,
			{ $setOnInsert: user },
			{ new: true, upsert: true },
			(err, result) => {
				observer.next(result.value);
				observer.complete();
			},
		);
	});
}

function createToken(provider, user) {
	return Observable.create(observer => {
		const subject = `${user._id}`;
		const secret = user.providers[provider].id;
		jwt.sign({ provider }, salt + secret, { subject }, (err, token) => {
			if (err) {
				observer.error(err);
			} else {
				observer.next(token);
			}
			observer.complete();
		});
	});
}

export function authHandler(req, res, next) {
	const { redirect_url: redirectUrl, code, provider } = req.body;

	getAccessToken(provider, redirectUrl, code)
		.switchMap(token => getUser(provider, token))
		.switchMap(authUser => createOrFindUser(provider, authUser))
		.switchMap(user => createToken(provider, user))
		.subscribe(
			token => { res.json({ token }); },
			({ response, status }) => {
				const err = new Error(response.error_description);
				err.status = status;
				err.type = `auth:${response.error}`;
				next(err);
			},
		);
}

export function authUrlHandler(req, res) {
	const { redirect_url: redirectUrl, provider } = req.body;
	res.json({ url: getLoginURL(provider, redirectUrl) });
}

export function authUserHandler(req, res) {
	res.json(getPublicUser(req.user));
}
