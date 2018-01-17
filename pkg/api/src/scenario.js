export default {
	name: 'Classic',
	allowance: {
		city: 4,
		road: 15,
		settlement: 5,
	},
	costs: {
		city: {
			grain: 2,
			ore: 3,
		},
		road: {
			brick: 1,
			lumber: 1,
		},
		settlement: {
			brick: 1,
			grain: 1,
			lumber: 1,
			wool: 1,
		},
	},
	layout: [
		// w = water
		// t = terrain
		[null, null, null, 'w', 'w', 'w', 'w'],
		[null, null, 'w', 't', 't', 't', 'w'],
		[null, 'w', 't', 't', 't', 't', 'w'],
		['w', 't', 't', 't', 't', 't', 'w'],
		['w', 't', 't', 't', 't', 'w'],
		['w', 't', 't', 't', 'w'],
		['w', 'w', 'w', 'w'],
	],
	terrains: [
		'desert',
		'fields',
		'fields',
		'fields',
		'fields',
		'forest',
		'forest',
		'forest',
		'forest',
		'hills',
		'hills',
		'hills',
		'mountains',
		'mountains',
		'mountains',
		'pasture',
		'pasture',
		'pasture',
		'pasture',
	],
};
