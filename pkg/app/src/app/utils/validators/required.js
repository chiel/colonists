export default function required(message = 'This field is required') {
	return value => {
		if (value.replace(/\s+/, '') === '') throw new Error(message);
		return value;
	};
}
