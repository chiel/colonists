import PT from 'prop-types';
import React from 'react';

import withField from './Field';

import css from '../../styles/input.css';

export class InputText extends React.PureComponent {
	static propTypes = {
		onChange: PT.func,
		onUpdate: PT.func.isRequired,
	};

	static defaultProps = {
		onChange: () => {},
	};

	handleChange = ev => {
		this.props.onUpdate(ev.target.value);
		this.props.onChange(ev);
	}

	render() {
		const { ...props } = this.props;

		delete props.onUpdate;

		return (
			<div className={css.input}>
				<input
					{...props}
					onChange={this.handleChange}
					type="text"
				/>
			</div>
		);
	}
}

export default withField(InputText);
