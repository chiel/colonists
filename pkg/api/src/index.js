import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';

import { authHandler, authUrlHandler, authUserHandler } from './routes/auth';
import { dataChitsHandler } from './routes/data';
import authMiddleware from './utils/authMiddleware';
import createSocketServer from './utils/createSocketServer';
import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

const app = express();
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(cors());

app.post('/auth', authHandler);
app.post('/auth/url', authUrlHandler);
app.get('/auth/user', authMiddleware, authUserHandler);
app.get('/data/chits', dataChitsHandler);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

const server = createServer(app);
createSocketServer(server);

const port = process.env.PORT || 12950;
server.listen(port, () => {
	console.info(`Listening on port ${port}`);
});
