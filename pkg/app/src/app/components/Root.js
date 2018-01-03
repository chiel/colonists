import PT from 'prop-types';
import React from 'react';

export default class Root extends React.PureComponent {
	static propTypes = {
		children: PT.node,
	};

	static defaultProps = {
		children: undefined,
	};

	render() {
		const { children } = this.props;

		return (
			<div>{children}</div>
		);
	}
}
