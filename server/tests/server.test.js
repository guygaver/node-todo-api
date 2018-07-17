const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');

const todos = [
    {_id: new ObjectId, text: "Something 1", completed: false},
    {_id: new ObjectId, text: "Something 2", completed: true, completedAt: 333},
    {_id: new ObjectId, text: "Something 3", completed: false}
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test Todo Text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((e, res) => {
                if ( e ) {
                    return done(e);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e))
            })
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((e, res) => {
                if ( e ) {
                    return done(e);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch((e) => done(e))
            })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {

    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {

        let invalidId = 'SomeInvalidTodo';

        request(app)
            .get(`/todos/${invalidId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {

        let nonExistingId = new ObjectId().toHexString();

        request(app)
            .get(`/todos/${nonExistingId}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should delete todo given an id', (done) => {

        let hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if ( err ) {
                    return done(err);
                }

                Todo.findById(hexId).then(todo => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch(e => done(e));
            });
    });

    it('should return 404 if todo not found', (done) => {

        let nonExistingId = new ObjectId().toHexString();

        request(app)
            .delete(`/todos/${nonExistingId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {

        let invalidId = 'SomeInvalidTodo';

        request(app)
            .delete(`/todos/${invalidId}`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should mark a todo as completed and update text', (done) => {
        let hexId = todos[0]._id.toHexString();
        let text = 'Changing from test';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({text, completed:true})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toEqual(true);
            })
            .end(done);
    });

    it('should mark a todo as not completed and update completedAt', (done) => {
        let hexId = todos[1]._id.toHexString();

        request(app)
            .patch(`/todos/${hexId}`)
            .send({completed: false})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completedAt).toBe(null);
                expect(res.body.todo.completed).toEqual(false);
            })
            .end(done);
    });
});