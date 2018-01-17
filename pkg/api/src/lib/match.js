import { collection } from '../db';

export async function insertMatch(match) {
	try {
		const coll = await collection('match');
		const doc = await coll.insert(match);
		return doc.ops[0];
	} catch (err) {
		console.error('error inserting match', err);
	}
}
