import express from 'express';

const app = express();
app.disable('x-powered-by');

const port = process.env.PORT || 12950;
app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});
