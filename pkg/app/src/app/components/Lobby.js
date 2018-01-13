import PT from 'prop-types';
import React from 'react';

import Button from '../components/Button';
import css from '../styles/lobby.css';
import * as types from '../types';

export default class Lobby extends React.PureComponent {
	static propTypes = {
		onJoinQueue: PT.func.isRequired,
		sessionUser: types.user.isRequired,
	};

	render() {
		const { onJoinQueue, sessionUser } = this.props;

		return (
			<div className={css.container}>
				<p>Welcome {sessionUser.first_name}!</p>
				<Button onClick={onJoinQueue} primary>
					Join queue
				</Button>
			</div>
		);
	}
}
