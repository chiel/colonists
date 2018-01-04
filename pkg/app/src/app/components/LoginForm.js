import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Button from './Button';
import withForm from './Form';

import { setUser } from '../actions/session';
import css from '../styles/login-form.css';
import * as validators from '../utils/validators';

export class LoginForm extends React.PureComponent {
	static propTypes = {
		dispatch: PT.func.isRequired,
		fields: PT.objectOf(PT.func).isRequired,
		formValidate: PT.func.isRequired,
		router: PT.shape({
			push: PT.func.isRequired,
		}).isRequired,
	};

	handleSubmit = ev => {
		ev.preventDefault();

		const { dispatch, formValidate, router } = this.props;
		formValidate()
			.then(({ username }) => {
				dispatch(setUser({ username }));
				router.push('/lobby');
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
}))(connect()(withRouter(LoginForm)));
