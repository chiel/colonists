import { createSelector } from 'reselect';

function coordIsTerrain(tm, coord) {
	const c = coord.join('.');
	return tm[c] && tm[c] !== 'water';
}

export function selectTileDimensions() {
	const size = 80;
	const height = size * 2;
	const width = (Math.sqrt(3) / 2) * height;
	return { size, height, width };
}

export const selectTiles = createSelector(
	state => state.match.layout,
	selectTileDimensions,

	(layout, td) => {
		const sx = td.width;
		const sy = td.height * 0.75;

		return layout.map(tile => ({
			...tile,
			x: (tile.r * (sx / 2)) + (tile.c * sx),
			y: (tile.r * sy),
		}));
	},
);

export const selectTileMap = createSelector(
	selectTiles,

	layout => layout
		.reduce((m, { c, r, t }) => ({
			...m,
			[`${c}.${r}`]: t,
		}), {}),
);

export const selectEdges = createSelector(
	selectTiles,
	selectTileMap,
	selectTileDimensions,

	(tiles, tm, td) => tiles
		.map(tile => {
			const edges = [];

			let coord = [tile.c, tile.r - 1];
			if (tile.t !== 'water' || coordIsTerrain(tm, coord)) {
				edges.push({
					id: `${tile.c}.${tile.r}.N`,
					x1: tile.x + (td.width / 2),
					y1: tile.y,
					x2: tile.x,
					y2: tile.y + (td.height * 0.25),
				});
			}

			coord = [tile.c - 1, tile.r];
			if (tile.t !== 'water' || coordIsTerrain(tm, coord)) {
				edges.push({
					id: `${tile.c}.${tile.r}.W`,
					x1: tile.x,
					y1: tile.y + (td.height * 0.25),
					x2: tile.x,
					y2: tile.y + (td.height * 0.75),
				});
			}

			coord = [tile.c - 1, tile.r + 1];
			if (tile.t !== 'water' || coordIsTerrain(tm, coord)) {
				edges.push({
					id: `${tile.c}.${tile.r}.S`,
					x1: tile.x,
					y1: tile.y + (td.height * 0.75),
					x2: tile.x + (td.width / 2),
					y2: tile.y + td.height,
				});
			}

			return edges;
		})
		.reduce((a, b) => a.concat(b), []),
);

export const selectVertices = createSelector(
	selectTiles,
	selectTileMap,
	selectTileDimensions,

	(tiles, tm, td) => tiles
		.map(tile => {
			const vertices = [];

			let coord1 = [tile.c, tile.r - 1];
			let coord2 = [tile.c + 1, tile.r - 1];
			if (
				tile.t !== 'water' ||
				coordIsTerrain(tm, coord1) ||
				coordIsTerrain(tm, coord2)
			) {
				vertices.push({
					id: `${tile.c}.${tile.r}.T`,
					x: tile.x + (td.width / 2),
					y: tile.y,
				});
			}

			coord1 = [tile.c - 1, tile.r + 1];
			coord2 = [tile.c, tile.r + 1];
			if (
				tile.t !== 'water' ||
				coordIsTerrain(tm, coord1) ||
				coordIsTerrain(tm, coord2)
			) {
				vertices.push({
					id: `${tile.c}.${tile.r}.B`,
					x: tile.x + (td.width / 2),
					y: tile.y + td.height,
				});
			}

			return vertices;
		})
		.reduce((a, b) => a.concat(b), []),
);

export const selectDimensions = createSelector(
	selectTiles,
	selectTileDimensions,

	(tiles, td) => {
		const xs = tiles.map(tile => tile.x);
		const ys = tiles.map(tile => tile.y);
		const minX = Math.floor(Math.min(...xs));
		const minY = Math.floor(Math.min(...ys));
		const maxX = Math.ceil(Math.max(...xs));
		const maxY = Math.ceil(Math.max(...ys));
		const width = Math.ceil((maxX - minX) + td.width);
		const height = Math.ceil((maxY - minY) + td.height);

		return { x: minX, y: minY, width, height };
	},
);
