import PT from 'prop-types';
import React from 'react';

import css from '../styles/tile.css';
import * as types from '../types';
import classnames from '../utils/classnames';

export default class Tile extends React.PureComponent {
	static propTypes = {
		size: PT.number.isRequired,
		tile: types.tile.isRequired,
	};

	render() {
		const { size, tile: { t, x, y } } = this.props;

		const height = size * 2;
		const width = (Math.sqrt(3) / 2) * height;

		return (
			<g
				className={classnames(css.tile, css[`tile-${t}`])}
				transform={`translate(${x}, ${y})`}
			>
				<rect
					clipPath="url(#tile-clip)"
					height={height}
					width={width}
				/>
			</g>
		);
	}
}
