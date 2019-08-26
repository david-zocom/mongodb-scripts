// Mål: lägga till nytt dokument i collection
const dbname = 'shop', dbcol = 'books';
const connectionString = 'mongodb://localhost:27017';
const MongoClient = require('mongodb').MongoClient;
// mongo shell: db.books.insert(newDocs)

const settings = {
	useNewUrlParser: true, useUnifiedTopology: true
}

MongoClient.connect(connectionString, settings, (error, client) => {
	if( error ) {
		console.error('Critical connection failure', error);
		throw error;
	}

	let collection = client.db(dbname).collection(dbcol);
	let newDocs = [
		{ name: 'Factfulness', price: 130, author: 'Hans Rosling' }
	];
	collection.insertMany(newDocs, (error, result) => {
		if(error) {
			console.error('Could not insert', error);
			throw error;
		}
		console.log('Inserted new documents!', result);
		// Vi kan komma åt det id som MongoDB skapar så här:
		// let id = result.insertedIds[0]
	})
});
