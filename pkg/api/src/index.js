import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import uuid from 'uuid/v4';

import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

const app = express();
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
	const id = uuid();
	const { username } = req.body;
	res.json({ id, username });
});

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

const port = process.env.PORT || 12950;
app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});
