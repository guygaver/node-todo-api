require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const parser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {ObjectId} = require('mongodb');
let {Todo} = require('./models/Todo');
let {User} = require('./models/User');

const app = express();
const port = process.env.PORT;
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

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if ( !ObjectId.isValid(id) ) {
        return res.status(404).send();
    }

    Todo.findById(id)
        .then(todo => {

            if ( !todo ) {
                return res.status(404).send();
            }

            return res.send({todo});
        })
        .catch(e => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if ( !ObjectId.isValid(id) ) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id)
        .then(todo => {

            if ( !todo ) {
                return res.status(404).send();
            }

            return res.send({todo});
        })
        .catch(e => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if ( !ObjectId.isValid(id) ) {
        return res.status(404).send();
    }

    if ( _.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new:true})
        .then(todo => {

            if ( !todo ) {
                return res.status(404).send();
            }

            return res.send({todo});
        })
        .catch(e => res.status(400).send());
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

module.exports = {
    app
};
