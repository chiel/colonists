import PT from 'prop-types';

export const tile = PT.shape({
	c: PT.number.isRequired,
	r: PT.number.isRequired,
	t: PT.string.isRequired,
});

export const edge = PT.shape({
	id: PT.string.isRequired,
	x1: PT.number.isRequired,
	y1: PT.number.isRequired,
	x2: PT.number.isRequired,
	y2: PT.number.isRequired,
});

export const vertex = PT.shape({
	id: PT.string.isRequired,
	x: PT.number.isRequired,
	y: PT.number.isRequired,
});

export const match = PT.shape({
	layout: PT.arrayOf(tile),
});

export const state = PT.shape({
	error: PT.string.isRequired,
	pending: PT.bool.isRequired,
});

export const user = PT.shape({
	id: PT.string.isRequired,
	email: PT.string.isRequired,
	first_name: PT.string.isRequired,
	last_name: PT.string.isRequired,
	image: PT.string.isRequired,
});
