import { Server } from 'ws';

export default function createSocketServer(server) {
	const wss = new Server({ server });
	wss.on('connection', ws => {
		ws.on('error', (...args) => {
			console.info('HANDLE ERROR', args);
		});

		ws.on('message', message => {
			console.info('message', message);
		});
	});
}
