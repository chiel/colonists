import PT from 'prop-types';

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
