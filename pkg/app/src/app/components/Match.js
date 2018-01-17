import React from 'react';
import { connect } from 'react-redux';

import Board from './Board';

import { selectMatch } from '../selectors/match';
import * as types from '../types';

export class Match extends React.PureComponent {
	static propTypes = {
		match: types.match.isRequired,
	};

	render() {
		const { match } = this.props;

		return (
			<div>
				{match.id ? (
					<Board />
				) : (
					<p>No match found.</p>
				)}
			</div>
		);
	}
}

export default connect(state => ({
	match: selectMatch(state),
}))(Match);
