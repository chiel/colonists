import './utils/cssLoader';

import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import createStoreMiddleware from './utils/createStoreMiddleware';
import renderDocument from './utils/renderDocument';

import routes from '../app/routes';

const app = express();
app.disable('x-powered-by');

app.use(express.static(`${__dirname}/../public`));
app.use(createStoreMiddleware);

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
