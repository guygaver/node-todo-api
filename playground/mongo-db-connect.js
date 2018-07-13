const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if ( err ) {
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected to mongo client');
    
    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        completed: true,
        todo: 'Smoke a Joint'
    }, (err, result) => {
        if ( err ) {
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    
    // Insert new doc into user
    db.collection('Users').insertOne({
        name: 'SUmba',
        age: 26,
        location: 'Wyoming'
    }, (err, result) => {
        if ( err ) {
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    });

    client.close();
});
