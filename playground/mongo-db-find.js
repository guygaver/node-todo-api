const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if ( err ) {
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected to mongo client');

    const db = client.db('TodoApp');
    
    // db.collection('Todos').find({_id: new ObjectID("5b4935f5b801812f5ba23c2a")}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, err => console.log('Unable to find docs ' + err));

    // db.collection('Todos').find().count().then(count => {
    //     console.log(`Todos Count: ${count}`);
    // }, err => console.log('Unable to find docs ' + err));
    
    db.collection('Users').find({
        name: 'SUmba'
    }).toArray().then(docs => {
        console.log('Name where SUmba:');
        console.log(JSON.stringify(docs, undefined, 2));
    })

    client.close();
});

