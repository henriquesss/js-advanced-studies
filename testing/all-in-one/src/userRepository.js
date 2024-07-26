// Mock database
let users = [];
let currentId = 1;

const functions = {
    list: () => {
        return users;
    },
    listById: (id) => {
        const user = users.find(u => u.id === parseInt(id));
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
        const userIndex = users.findIndex(u => u.id === parseInt(id));
        if (userIndex === -1) return false;

        users[userIndex] = { ...users[userIndex], ...userData };
        return users[userIndex];
    },
    delete: (id) => {
        const userIndex = users.findIndex(u => u.id === parseInt(id));
        if (userIndex === -1) return false;

        users.splice(userIndex, 1);
        return true;
    }
}

module.exports = functions;