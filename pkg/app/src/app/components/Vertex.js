import React from 'react';

import css from '../styles/vertex.css';
import * as types from '../types';

export default class Vertex extends React.PureComponent {
	static propTypes = {
		vertex: types.vertex.isRequired,
	};

	handleClick = () => {
		console.info('click:vertex', this.props.vertex.id);
	};

	render() {
		const { x, y } = this.props.vertex;

		return (
			<circle
				className={css.vertex}
				onClick={this.handleClick}
				cx={x}
				cy={y}
				r={15}
			/>
		);
	}
}
