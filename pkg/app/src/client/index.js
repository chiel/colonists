import '../app/styles/base.css';

import React from 'react';
import { hydrate } from 'react-dom';

import Root from '../app/components/Root';

hydrate(
	<Root>Hello world.</Root>,
	document.getElementById('app-root'),
);
