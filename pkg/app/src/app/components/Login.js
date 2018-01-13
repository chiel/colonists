import React from 'react';

import Button from './Button';

import css from '../styles/login.css';

export default function Login() {
	return (
		<div className={css.container}>
			<h1>Sign in</h1>
			<p>
				Colonists.io aims to provide a pleasant experience to play
				Settlers of Catan online, with people of a similar skill level.
			</p>
			<Button href="/auth/google" primary>Sign in with Google</Button>
		</div>
	);
}
