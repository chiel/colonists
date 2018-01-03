import '../app/styles/base.css';

import React from 'react';
import { hydrate } from 'react-dom';

import LayoutBranded from '../app/components/LayoutBranded';
import LoginForm from '../app/components/LoginForm';
import Root from '../app/components/Root';

hydrate(
	<Root>
		<LayoutBranded>
			<LoginForm />
		</LayoutBranded>
	</Root>,
	document.getElementById('app-root'),
);
