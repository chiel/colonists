import LayoutBranded from './components/LayoutBranded';
import LobbyContainer from './components/LobbyContainer';
import LoginForm from './components/LoginForm';
import Root from './components/Root';

export default [
	{
		component: Root,
		childRoutes: [
			{
				component: LayoutBranded,
				childRoutes: [
					{
						path: '/',
						component: LoginForm,
					},
				],
			},
			{
				path: '/lobby',
				component: LobbyContainer,
			},
		],
	},
];
