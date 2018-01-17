import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Edge from './Edge';
import Tile from './Tile';
import Vertex from './Vertex';

import { selectDimensions, selectEdges, selectTiles, selectVertices } from '../selectors/board';
import * as types from '../types';

function hexCorner(center, radius, i) {
	const deg = (60 * i) + 30;
	const rad = (Math.PI / 180) * deg;

	return {
		x: center.x + (radius * Math.cos(rad)),
		y: center.y + (radius * Math.sin(rad)),
	};
}

export class Board extends React.PureComponent {
	static propTypes = {
		dimensions: PT.shape({
			x: PT.number.isRequired,
			y: PT.number.isRequired,
			width: PT.number.isRequired,
			height: PT.number.isRequired,
		}).isRequired,
		edges: PT.arrayOf(types.edge).isRequired,
		tiles: PT.arrayOf(types.tile).isRequired,
		vertices: PT.arrayOf(types.vertex).isRequired,
	};

	render() {
		const { dimensions, edges, tiles, vertices } = this.props;

		const tileSize = 80;
		const tileHeight = tileSize * 2;
		const tileWidth = (Math.sqrt(3) / 2) * tileHeight;

		const viewBox = [
			dimensions.x,
			dimensions.y,
			dimensions.width,
			dimensions.height,
		].join(' ');

		const center = { x: tileWidth / 2, y: tileHeight / 2 };
		const points = [0, 1, 2, 3, 4, 5]
			.map(i => hexCorner(center, tileSize - 2, i))
			.map(point => `${point.x},${point.y}`)
			.join(' ');

		return (
			<svg viewBox={viewBox} style={{ width: dimensions.width, height: dimensions.height }}>
				<defs>
					<clipPath id="tile-clip">
						<polygon points={points} />
					</clipPath>
				</defs>
				{tiles.map(tile => (
					<Tile key={`F${tile.c}.${tile.r}`} size={tileSize} tile={tile} />
				))}
				{edges.map(edge => (
					<Edge key={edge.id} edge={edge} />
				))}
				{vertices.map(vertex => (
					<Vertex key={vertex.id} vertex={vertex} />
				))}
			</svg>
		);
	}
}

export default connect(state => ({
	dimensions: selectDimensions(state),
	edges: selectEdges(state),
	tiles: selectTiles(state),
	vertices: selectVertices(state),
}))(Board);
