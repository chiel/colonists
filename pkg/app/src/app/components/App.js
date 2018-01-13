import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { openSocket } from '../actions/socket';

export class App extends React.PureComponent {
	static propTypes = {
		children: PT.node,
		dispatch: PT.func.isRequired,
	};

	static defaultProps = {
		children: undefined,
	};

	componentDidMount() {
		this.props.dispatch(openSocket());
	}

	render() {
		return (
			<div>{this.props.children}</div>
		);
	}
}

export default connect()(App);
