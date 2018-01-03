import { renderToString } from 'react-dom/server'

export default function renderDocument(component) {
	const markup = renderToString(component);

	/* eslint-disable indent */
	return `<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Colonists</title>
	</head>
	<body>
		<div id="app-root">${markup}</div>
	</body>
</html>`;
	/* eslint-enable indent */
}
