import PT from 'prop-types';
import React from 'react';

import Button from './Button';
import withForm from './Form';

import css from '../styles/login-form.css';
import * as validators from '../utils/validators';

export class LoginForm extends React.PureComponent {
	static propTypes = {
		fields: PT.objectOf(PT.func).isRequired,
		formValidate: PT.func.isRequired,
	};

	handleSubmit = ev => {
		ev.preventDefault();
		this.props.formValidate()
			.then(values => {
				console.log('VALID', values);
			})
			.catch(() => {});
	}

	render() {
		const { fields } = this.props;

		return (
			<form
				className={css.form}
				onSubmit={this.handleSubmit}
			>
				<h1>Sign in</h1>
				<p>
					Colonists.io aims to provide a pleasant experience to play
					Settlers of Catan online, with people of a similar skill level.
				</p>
				<fields.username />
				<Button primary submit>Sign in</Button>
			</form>
		);
	}
}

export default withForm(() => ({
	fields: {
		username: {
			type: 'text',
			label: 'Username',
			name: 'username',
			placeholder: 'e.g. The_Colonist',
			hint: 'May contain letters, numbers, spaces or underscores',
			validators: [
				validators.required('Please select a username.'),
				validators.pattern(/^[0-9A-Za-z_ ]+$/, 'Please only use letters, numbers, spaces or underscores.'),
			],
		},
	},
}))(LoginForm);
