import express from 'express';

import handleErrorMiddleware from './utils/handleErrorMiddleware';
import notFoundMiddleware from './utils/notFoundMiddleware';

const app = express();
app.disable('x-powered-by');

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

const port = process.env.PORT || 12950;
app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});
