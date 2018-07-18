const {ObjectId} = require('mongodb');
const {Todo} = require('./../../models/Todo');
const {User} = require('./../../models/User');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectId;
const userTwoId = new ObjectId;
const users = [{
    _id: userOneId,
    email: 'guygaver@gmail.com',
    password: 'password',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'jen@test.com',
    password: 'password',
}];

const todos = [
    {_id: new ObjectId, text: "Something 1", completed: false},
    {_id: new ObjectId, text: "Something 2", completed: true, completedAt: 333},
    {_id: new ObjectId, text: "Something 3", completed: false}
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => {
        done();
    });
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();
        
        return Promise.all([userOne, userTwo]);
    }).then(() => {
        done();
    });
};

module.exports = {
    todos,
    users,
    populateTodos,
    populateUsers
};