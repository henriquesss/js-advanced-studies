const { test, beforeEach } = require('node:test');
const assert = require('assert');
const userService = require('../src/userService')

let users;
let currentId;

beforeEach(() => {
    users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];
    currentId = 3;
});

test('list should return all users', () => {
    const result = userService.list();
    assert.deepStrictEqual(result, users);
});

test('listById should return the user with the given id', () => {
    const result = userService.listById(1);
    assert.deepStrictEqual(result, users[0]);

    assert.throws(
        () => {
            userService.listById(99); // Supondo que 99 não existe
        },
        new Error('User not found')
    );
});

test('create(userData) should create a new user with an incremented ID', () => {
    const newUser = { name: 'Charlie', email: 'charlie@example.com' };
    const result = userService.create(newUser);
    const allUsers = userService.list();

    assert.deepStrictEqual(result, { id: 3, name: 'CHARLIE', email: 'charlie@example.com' });
    assert.strictEqual(allUsers.length, 3);
    assert.deepStrictEqual(allUsers[2], { id: 3, name: 'CHARLIE', email: 'charlie@example.com' });
});

test('update should update the user with the given id', () => {
    const updatedData = { email: 'alice_updated@example.com' };
    const result = userService.update(1, updatedData);
    const allUsers = userService.list()

    assert.deepStrictEqual(result, { id: 1, name: 'Alice', email: 'alice_updated@example.com' });
    assert.strictEqual(allUsers[0].email, 'alice_updated@example.com');
});

test('update should return false if user is not found', () => {
    assert.throws(
        () => {
            userService.update(99, { email: 'notfound@example.com' }); // Supondo que 99 não existe
        },
        new Error('User not found')
    );
});

test('delete should delete the user with the given id', () => {
    const result = userService.delete(1);
    const allUsers = userService.list();

    assert.strictEqual(result, true);
    assert.strictEqual(allUsers.length, 2);
    assert.strictEqual(allUsers.find(u => u.id === 1), undefined);
});

test('delete should return false if user is not found', () => {
    const allUsers = userService.list()
    assert.throws(
        () => {
            userService.delete(99); // Supondo que 99 não existe
        },
        new Error('User not found')
    );

    assert.strictEqual(allUsers.length, 2);
});