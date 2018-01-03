import PT from 'prop-types';
import React from 'react';

import css from '../styles/button.css';
import classnames from '../utils/classnames';

export default class Button extends React.PureComponent {
	static propTypes = {
		children: PT.node,
		className: PT.string,
		primary: PT.bool,
		small: PT.bool,
		submit: PT.bool,
	};

	static defaultProps = {
		children: undefined,
		className: undefined,
		primary: false,
		small: false,
		submit: false,
	};

	render() {
		const { children, className, primary, small, submit, ...props } = this.props;

		const classes = classnames(css.button, {
			[css.primary]: primary,
			[css.small]: small,
		}, className);

		return (
			<button
				{...props}
				className={classes}
				type={submit ? 'submit' : 'button'}
			>
				{children}
			</button>
		);
	}
}
