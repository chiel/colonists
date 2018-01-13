export default function handleApiError({ response, status }, next) {
	const msg = `Request failed: ${response.error.message}`;
	const err = new Error(msg);
	err.status = status;
	err.type = response.error.type;
	next(err);
}
