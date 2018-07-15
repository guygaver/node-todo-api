const express = require('express');
const parser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/Todo');
let {User} = require('./models/User');

const app = express();
app.use(parser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.sendStatus(400);
    })
});

app.get('/todos', (req, res) => {
    Todo.find({}).then((todos) => {
        res.send({todos});
    }, (e) => {
        res.sendStatus(400);
    })
});

app.listen(3000, () => {
    console.log('App started on port 3000');
});

module.exports = {
    app
};
