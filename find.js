// Mål: visa alla dokument i collection
const dbname = 'shop', dbcol = 'books';
const connectionString = 'mongodb://localhost:27017';
const MongoClient = require('mongodb').MongoClient;
// Motsvarande kommando i Mongo shell: db.books.find()

// Rekommenderad förbättring: lägg det som är gemensamt för skripten i en egen fil, db.js, för att undvika att samma konstanter finns på flera ställen. Då ökar risken att man ändrar på ett ställe.

// Inställningarna nedan säger till MongoDB att vi vill använda den senaste tekniken. De är inte nödvändiga, men rekommenderas.
const settings = {
	useNewUrlParser: true, useUnifiedTopology: true
}

MongoClient.connect(connectionString, settings, (error, client) => {
	// Alla anslutningsförsök kan misslyckas
	if( error ) {
		console.error('Critical connection failure', error);
		throw error;
	}

	// Plocka ut rätt collection ur databasen
	// Projection = välja ut vilka fält som ska tas med när man hämtar dokumenten från databasen (de som har värde 1)
	let collection = client.db(dbname).collection(dbcol);
	const projection = { _id: 0, name: 1, price: 1 };
	collection.find({}, {projection}).toArray((err, docs) => {
		if(err) {
			console.error('Could not convert documents to array', err);
			throw err;
		}
		// console.log('Found documents:', docs);
		console.log('Found the following books:');
		let result = docs.map(doc => doc.name);
		result.forEach(name => console.log('> ' + name));
		client.close();
	})
});
