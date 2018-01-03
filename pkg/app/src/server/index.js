import './utils/cssLoader';

import express from 'express';
import React from 'react';

import renderDocument from './utils/renderDocument';

import LayoutBranded from '../app/components/LayoutBranded';
import LoginForm from '../app/components/LoginForm';
import Root from '../app/components/Root';

const app = express();
app.disable('x-powered-by');

app.use(express.static(`${__dirname}/../public`));

app.get('/', (req, res) => {
	const body = renderDocument(
		<Root>
			<LayoutBranded>
				<LoginForm />
			</LayoutBranded>
		</Root>,
	);
	res.send(body);
});

const port = process.env.PORT || 12951;
app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});
