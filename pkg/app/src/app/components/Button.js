import PT from 'prop-types';
import React from 'react';

import css from '../styles/button.css';
import classnames from '../utils/classnames';

export default class Button extends React.PureComponent {
	static propTypes = {
		children: PT.node,
		className: PT.string,
		href: PT.string,
		primary: PT.bool,
		small: PT.bool,
		submit: PT.bool,
	};

	static defaultProps = {
		children: undefined,
		className: undefined,
		href: undefined,
		primary: false,
		small: false,
		submit: false,
	};

	render() {
		const { children, className, href, primary, small, submit, ...props } = this.props;

		let component = 'button';
		if (href) {
			component = 'a';
			props.href = href;
		}

		const classes = classnames(css.button, {
			[css.primary]: primary,
			[css.small]: small,
		}, className);

		return React.createElement(
			component,
			{
				...props,
				className: classes,
				type: submit ? 'submit' : 'button',
			},
			children,
		);
	}
}
