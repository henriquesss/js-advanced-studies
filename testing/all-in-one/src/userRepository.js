// Mock database
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
];
let currentId = 3;

const functions = {
    list: () => {
        return users;
    },
    listById: (id) => {
        const user = users.find(u => u.id === id);
        return user;
    },
    create: (userData) => {
        if (userData.name) {
            userData.name = userData.name.toUpperCase();
        }
        const newUser = { id: currentId++, ...userData };
        users.push(newUser);
        return newUser;
    },
    update: (id, userData) => {
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) return false;

        users[userIndex] = { ...users[userIndex], ...userData };
        return users[userIndex];
    },
    delete: (id) => {
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) return false;

        users.splice(userIndex, 1);
        return true;
    }
}

module.exports = functions;