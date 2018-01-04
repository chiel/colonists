import '../app/styles/base.css';

import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import LayoutBranded from '../app/components/LayoutBranded';
import LoginForm from '../app/components/LoginForm';
import Root from '../app/components/Root';
import reducer from '../app/reducers';

const store = createStore(reducer, window.INITIAL_STATE);
window.store = store;

hydrate(
	<Provider store={store}>
		<Root>
			<LayoutBranded>
				<LoginForm />
			</LayoutBranded>
		</Root>
	</Provider>,
	document.getElementById('app-root'),
);
