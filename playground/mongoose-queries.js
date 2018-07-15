const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');

const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

let id = '5b4aad528d0580425561adf9';

if ( !ObjectId.isValid(id) ) {
    return console.log('ID is not valid');
}

Todo.findById(id).then((todo) => {

    if ( !todo ) {
        return console.log('Id not found')
    }
    console.log('Todo:', todo);
}, (e) => {
    console.log(e);
});

id = '5b4a56bd1016f83d26a5f9a8';

User.findById(id).then((user) => {
    if ( !user ) {
        return console.log('User id not found');
    }
    console.log('User:', user);
});