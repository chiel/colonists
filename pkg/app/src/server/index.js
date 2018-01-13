import './utils/cssLoader';

import cookieParser from 'cookie-parser';
import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import createStoreMiddleware from './utils/createStoreMiddleware';
import renderDocument from './utils/renderDocument';
import handleApiError from './utils/handleApiError';

import { setUser } from '../app/actions/session';
import routes from '../app/routes';
import api from '../app/utils/api';

const app = express();
app.disable('x-powered-by');

app.use(express.static(`${__dirname}/../public`));
app.use(cookieParser());
app.use(createStoreMiddleware);

app.use((req, res, next) => {
	const token = req.cookies.colonists_token;
	if (!token && !/^\/(?:auth|login)/.test(req.path)) {
		return res.redirect('/login');
	}

	if (!token) {
		return next();
	}

	api('/auth/user', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.subscribe(
			({ response }) => {
				req.store.dispatch(setUser(response));
				next();
			},
			response => handleApiError(response, next),
		);
});

app.get(/^\/auth\/(google)$/, (req, res, next) => {
	const provider = req.params[0];
	const redirectUrl = `${process.env.APP_URL}/auth/${provider}/callback`;

	api('/auth/url', {
		method: 'POST',
		body: JSON.stringify({ provider, redirect_url: redirectUrl }),
	})
		.subscribe(
			({ response }) => {
				res.redirect(302, response.url);
			},
			response => handleApiError(response, next),
		);
});

app.get(/^\/auth\/(google)\/callback$/, (req, res, next) => {
	const provider = req.params[0];
	const { code } = req.query;
	const redirectUrl = `${process.env.APP_URL}/auth/${provider}/callback`;

	api('/auth', {
		method: 'POST',
		body: JSON.stringify({ code, provider, redirect_url: redirectUrl }),
	})
		.subscribe(
			({ response }) => {
				const { token } = response;
				res.cookie('colonists_token', token);
				res.redirect(302, '/');
			},
			response => handleApiError(response, next),
		);
});

app.get('*', (req, res, next) => {
	match({ routes, location: req.url }, (err, redirect, props) => {
		if (err) return next(err);

		if (redirect) {
			return res.redirect(301, redirect.pathname + redirect.search);
		}

		if (!props) {
			return next();
		}

		const body = renderDocument(
			<Provider store={req.store}>
				<RouterContext {...props} />
			</Provider>,
			req.store.getState(),
		);
		res.send(body);
	});
});

const port = process.env.PORT || 12951;
app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});
