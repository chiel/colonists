import express from 'express';
import React from 'react';

import renderDocument from './utils/renderDocument';

import Root from '../app/components/Root';

const app = express();
app.disable('x-powered-by');

app.get('/', (req, res) => {
	const body = renderDocument(<Root>Hello world.</Root>);
	res.send(body);
});

const port = process.env.PORT || 12951;
app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});
