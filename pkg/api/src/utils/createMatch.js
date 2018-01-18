export default function createMatch({ allowance, chits, name, terrains, ...scenario }) {
	let ch = -1;
	let t = -1;
	const layout = scenario.layout
		.map((row, r) => (
			row
				.map((col, c) => {
					if (!col) return null;
					const terrain = col === 'w' ? 'water' : terrains[++t];
					const chit = terrain !== 'water' && terrain !== 'desert' ? chits[++ch] : null;
					return { c, r, n: chit, t: terrain };
				})
				.filter(col => !!col)
		))
		.reduce((all, row) => all.concat(row), []);

	return { name, allowance, layout };
}
