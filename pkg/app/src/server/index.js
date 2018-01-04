import './utils/cssLoader';

import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';

import createStoreMiddleware from './utils/createStoreMiddleware';
import renderDocument from './utils/renderDocument';

import LayoutBranded from '../app/components/LayoutBranded';
import LoginForm from '../app/components/LoginForm';
import Root from '../app/components/Root';

const app = express();
app.disable('x-powered-by');

app.use(express.static(`${__dirname}/../public`));
app.use(createStoreMiddleware);

app.get('/', (req, res) => {
	const body = renderDocument(
		<Provider store={req.store}>
			<Root>
				<LayoutBranded>
					<LoginForm />
				</LayoutBranded>
			</Root>
		</Provider>,
		req.store.getState(),
	);
	res.send(body);
});

const port = process.env.PORT || 12951;
app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});
