const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');

const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({}).then((todo) => {
//     console.log(todo);
// });

// Todo.findByIdAndRemove('5b4bc9588d353b4d5c9e4831').then((todo) => {
//     console.log(todo);
// });

// Todo.