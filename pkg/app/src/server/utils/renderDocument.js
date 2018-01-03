import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';

export default function renderDocument(component) {
	const markup = renderToString(component);
	const helmet = Helmet.renderStatic();

	/* eslint-disable indent */
	return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		${helmet.title.toString()}
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather:300,400|Ubuntu:700">
		<link rel="stylesheet" href="/assets/app.css">
	</head>
	<body>
		<div id="app-root">${markup}</div>
		<script src="/assets/app.js"></script>
	</body>
</html>`;
	/* eslint-enable indent */
}
