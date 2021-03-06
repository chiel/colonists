import App from './components/App';
import LayoutBranded from './components/LayoutBranded';
import LobbyContainer from './components/LobbyContainer';
import Login from './components/Login';
import Match from './components/Match';
import Root from './components/Root';

export default [
	{
		component: Root,
		childRoutes: [
			{
				component: LayoutBranded,
				childRoutes: [
					{
						path: '/login',
						component: Login,
					},
				],
			},
			{
				component: App,
				childRoutes: [
					{
						path: '/',
						component: LobbyContainer,
					},
					{
						path: '/match/:id',
						component: Match,
					},
				],
			},
		],
	},
];
