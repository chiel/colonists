export default function createMatch({ name, allowance, terrains, ...scenario }) {
	let t = -1;
	const layout = scenario.layout
		.map((row, r) => (
			row
				.map((col, c) => (!col ? col : {
					c,
					r,
					t: col === 'w' ? 'water' : terrains[++t],
				}))
				.filter(col => !!col)
		))
		.reduce((all, row) => all.concat(row), []);

	return { name, allowance, layout };
}
