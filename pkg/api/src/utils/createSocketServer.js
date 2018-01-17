import { Server } from 'ws';

import createMatch from './createMatch';
import renameId from './renameId';

import { insertMatch } from '../lib/match';
import scenario from '../scenario';

export default function createSocketServer(server) {
	const wss = new Server({ server });
	wss.on('connection', ws => {
		ws.on('error', (...args) => {
			console.info('HANDLE ERROR', args);
		});

		ws.on('message', message => {
			const msg = JSON.parse(message);
			console.info('message', msg);
			switch (msg.type) {
			case 'queue:join':
				ws.send(JSON.stringify({ type: 'queue:joined' }));
				setTimeout(async () => {
					const match = renameId(await insertMatch(createMatch(scenario)));
					ws.send(JSON.stringify({ type: 'queue:ready', match }));
				}, 0);
				break;
			}
		});
	});
}
