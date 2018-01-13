import { ObjectID } from 'mongodb';

import { collection } from '../db';

export async function findUser(id) {
	const query = { _id: new ObjectID(id) };
	const coll = await collection('user');
	return await coll.findOne(query);
}
