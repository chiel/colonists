import React from 'react';

import * as types from '../types';

export default class Lobby extends React.PureComponent {
	static propTypes = {
		sessionUser: types.user.isRequired,
	};

	render() {
		const { sessionUser } = this.props;

		return (
			<p>Welcome {sessionUser.username}.</p>
		);
	}
}
