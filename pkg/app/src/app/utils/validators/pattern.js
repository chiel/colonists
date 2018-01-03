export default function pattern(pattern, message = 'This field should match given pattern') {
	return value => {
		if (!pattern.test(value)) throw new Error(message);
		return value;
	};
}
