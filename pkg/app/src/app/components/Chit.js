/* eslint-disable react/no-array-index-key */
import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { selectTileDimensions } from '../selectors/board';
import { selectChit } from '../selectors/chits';
import css from '../styles/chit.css';
import * as types from '../types';
import classnames from '../utils/classnames';

export class Chit extends React.PureComponent {
	static propTypes = {
		chit: types.chit.isRequired,
		tileDimensions: PT.shape({
			size: PT.number.isRequired,
			height: PT.number.isRequired,
			width: PT.number.isRequired,
		}).isRequired,
	};

	render() {
		const { chit, tileDimensions: td } = this.props;

		const size = 36;
		const x = (td.width / 2) - size;
		const y = ((td.height / 2) - size) - 2;

		const classes = classnames(css.chit, {
			[css.highChance]: chit.pips === 5,
		});

		const pipSize = 4;
		const pipSpacing = 4;

		const pipsWidth = (chit.pips * pipSize) + ((chit.pips - 1) * (pipSpacing / 2));
		const pipsX = (x + (pipSize / 2) + 0.5) - (pipsWidth / 2);

		return (
			<g className={classes} transform={`translate(${x}, ${y})`}>
				<circle className={css.circle} cx={size} cy={size} r={size} />
				<text
					className={css.letter}
					textAnchor="middle"
					x={size}
					y={20}
				>
					{chit.letter}
				</text>
				<text
					textAnchor="middle"
					alignmentBaseline="central"
					x={size}
					y={size}
				>
					{chit.number}
				</text>
				<g className={css.pips} transform={`translate(${pipsX}, 56)`}>
					{new Array(chit.pips).fill(0).map((c, i) => (
						<circle
							key={i}
							cx={((i + 1) * (pipSize / 2)) + (i * pipSpacing)}
							cy={pipSize / 2}
							r={pipSize / 2}
						/>
					))}
				</g>
			</g>
		);
	}
}

export default connect((state, props) => ({
	chit: selectChit(state, props.chit),
	tileDimensions: selectTileDimensions(),
}))(Chit);
