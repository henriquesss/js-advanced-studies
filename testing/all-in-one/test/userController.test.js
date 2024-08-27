const { test, beforeEach } = require('node:test');
const assert = require('assert');
const sinon = require('sinon');
const userController = require('../src/userController');
const userService = require('../src/userService');

let req, res;

beforeEach(() => {
    req = {
        params: {},
        body: {}
    };
    res = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis(),
        end: sinon.stub()
    };
});

test('list should return all users', () => {
    const mockUsers = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
    ];
    sinon.stub(userService, 'list').returns(mockUsers);

    userController.list(req, res);

    assert(res.json.calledWith(mockUsers));
    userService.list.restore();
});

test('list should return 500 if an error occurs', () => {
    const errorMessage = 'Unexpected error';
    sinon.stub(userService, 'list').throws(new Error(errorMessage));

    userController.list(req, res);

    assert(res.status.calledWith(500));
    assert(res.json.calledWith({ message: errorMessage }));
    userService.list.restore();
});

test('listById should return a user by ID', () => {
    
    const mockUser = { id: 1, name: 'Alice' };
    req.params.id = 1;
    sinon.stub(userService, 'listById').returns(mockUser);

    userController.listById(req, res);

    assert(res.json.calledWith(mockUser));
    userService.listById.restore();
});

test('listById should return 404 if user not found', () => {
    req.params.id = 99;
    sinon.stub(userService, 'listById').throws(new Error('User not found'));

    userController.listById(req, res);

    assert(res.status.calledWith(404));
    assert(res.json.calledWith({ message: 'User not found' }));
    userService.listById.restore();
});

test('create() should create a new user', () => {
    const newUser = { id: 3, name: 'Charlie' };
    req.body = { name: 'Charlie' };
    sinon.stub(userService, 'create').returns(newUser);

    userController.create(req, res);

    assert(res.status.calledWith(201));
    assert(res.json.calledWith(newUser));
    userService.create.restore();
});

test('create should return 404 if an error occurs during user creation', () => {
    const errorMessage = 'User creation failed';
    req.body = { name: 'Alice' };
    
    // Stub para simular um erro na criação do usuário
    sinon.stub(userService, 'create').throws(new Error(errorMessage));

    userController.create(req, res);

    // Verifica se o status retornado é 404 e o corpo da resposta contém a mensagem de erro
    assert(res.status.calledWith(404));
    assert(res.json.calledWith({ message: errorMessage }));

    // Restaura a função original
    userService.create.restore();
});

test('update() should update a user by ID', () => {
    const updatedUser = { id: 1, name: 'Alice Updated' };
    req.params.id = 1;
    req.body = { name: 'Alice Updated' };
    sinon.stub(userService, 'update').returns(updatedUser);

    userController.update(req, res);

    assert(res.json.calledWith(updatedUser));
    userService.update.restore();
});

test('update() should return 404 if user not found', () => {
    req.params.id = 99;
    req.body = { name: 'NotFound' };
    sinon.stub(userService, 'update').throws(new Error('User not found'));

    userController.update(req, res);

    assert(res.status.calledWith(404));
    assert(res.json.calledWith({ message: 'User not found' }));
    userService.update.restore();
});

test('delete() should delete a user by ID', () => {
    req.params.id = 1;
    sinon.stub(userService, 'delete').returns(true);

    userController.delete(req, res);

    assert(res.status.calledWith(204));
    assert(res.end.called);
    userService.delete.restore();
});

test('delete() should return 404 if user not found', () => {
    req.params.id = 99;
    sinon.stub(userService, 'delete').throws(new Error('User not found'));

    userController.delete(req, res);

    assert(res.status.calledWith(404));
    assert(res.json.calledWith({ message: 'User not found' }));
    userService.delete.restore();
});