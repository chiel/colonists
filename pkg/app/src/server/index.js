import express from 'express';

import renderDocument from './utils/renderDocument';

const app = express();
app.disable('x-powered-by');

app.get('/', (req, res) => {
	const body = renderDocument('Hello world.');
	res.send(body);
});

const port = process.env.PORT || 12951;
app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});
