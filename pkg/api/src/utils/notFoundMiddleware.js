export default function notFoundMiddleware(req, res, next) {
	const err = new Error('Could not find what you were looking for');
	err.type = 'not_found';
	err.status = 404;
	next(err);
}
