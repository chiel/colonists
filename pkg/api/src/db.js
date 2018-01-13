import { MongoClient } from 'mongodb';

let db;
MongoClient.connect(process.env.MONGO_URL, (err, client) => {
	if (err) {
		console.error('Failed to connect to mongodb');
		console.error(err);
		return;
	}

	db = client.db(process.env.MONGO_DB);
});

export async function collection(coll) {
	return db.collection(coll);
}
