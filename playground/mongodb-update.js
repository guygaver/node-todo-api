
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if ( err ) {
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected to mongo client');

    const db = client.db('TodoApp');
    
    // db.collection('Todos').findOneAndUpdate({
    //     todo: 'Do something'
    // }, {
    //     $set: {completed: false}
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        name: 'Guy G'
    }, {
        $inc: {age: 1}
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    client.close();
});