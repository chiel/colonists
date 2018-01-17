import React from 'react';

import css from '../styles/edge.css';
import * as types from '../types';

export default class Edge extends React.PureComponent {
	static propTypes = {
		edge: types.edge.isRequired,
	};

	handleClick = () => {
		console.info('click:edge', this.props.edge.id);
	}

	render() {
		const { x1, y1, x2, y2 } = this.props.edge;

		return (
			<line
				className={css.edge}
				onClick={this.handleClick}
				x1={x1}
				y1={y1}
				x2={x2}
				y2={y2}
			/>
		);
	}
}
