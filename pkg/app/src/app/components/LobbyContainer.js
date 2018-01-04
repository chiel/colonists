import React from 'react';
import { connect } from 'react-redux';

import Lobby from './Lobby';

import { selectUser } from '../selectors/session';
import * as types from '../types';

export class LobbyContainer extends React.PureComponent {
	static propTypes = {
		sessionUser: types.user.isRequired,
	};

	render() {
		const { sessionUser } = this.props;

		return (
			<Lobby sessionUser={sessionUser} />
		);
	}
}

export default connect(state => ({
	sessionUser: selectUser(state),
}))(LobbyContainer);
