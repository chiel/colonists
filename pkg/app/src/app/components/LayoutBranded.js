import PT from 'prop-types';
import React from 'react';

import css from '../styles/layout-branded.css';

export default class LayoutBranded extends React.PureComponent {
	static propTypes = {
		children: PT.node,
	};

	static defaultProps = {
		children: undefined,
	};

	render() {
		return (
			<div className={css.container}>
				<div className={css.brand} />
				<div className={css.content}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
