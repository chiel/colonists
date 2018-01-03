// courtesy of https://github.com/JedWatson/classnames,
// rewritten using es6 functionality and without UMD boilerplate
export default function classnames(...args) {
	const classes = [];

	args.forEach(arg => {
		if (!arg) return;

		const type = typeof arg;
		if (type === 'string' || type === 'number') {
			classes.push(arg);
		} else if (Array.isArray(arg) && arg.length) {
			const result = classnames(...arg);
			if (result) classes.push(result);
		} else if (type === 'object') {
			Object.keys(arg).forEach(key => {
				if (arg[key]) classes.push(key);
			});
		}
	});

	return classes.join(' ');
}
