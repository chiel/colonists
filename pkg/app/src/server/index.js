import express from 'express';

const app = express();
app.disable('x-powered-by');

app.get('/', (req, res) => {
	res.send('Hello world.');
});

const port = process.env.PORT || 12951;
app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});
