import PT from 'prop-types';

export const user = PT.shape({
	username: PT.string.isRequired,
});
