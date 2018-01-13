import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Lobby from './Lobby';

import { joinQueue } from '../actions/queue';
import { selectUser } from '../selectors/session';
import * as types from '../types';

export class LobbyContainer extends React.PureComponent {
	static propTypes = {
		dispatch: PT.func.isRequired,
		sessionUser: types.user.isRequired,
	};

	handleJoinQueue = () => {
		this.props.dispatch(joinQueue());
	}

	render() {
		const { sessionUser } = this.props;

		return (
			<Lobby
				onJoinQueue={this.handleJoinQueue}
				sessionUser={sessionUser}
			/>
		);
	}
}

export default connect(state => ({
	sessionUser: selectUser(state),
}))(LobbyContainer);
