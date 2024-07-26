const userRepository = require('./userRepository');

const functions = {
    list: () => {
        return userRepository.list()
    },
    listById: (id) => {
        const user = userRepository.listById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },
    create: (userData) => {
        return userRepository.create(userData)
    },
    update: (id, userData) => {
        const updatedUser = userRepository.updateUser(id, userData);
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    },
    delete: (id) => {
        const success = userRepository.deleteUser(id);
        if (!success) {
            throw new Error('User not found');
        }
        return success;
    }
}

module.exports = functions;