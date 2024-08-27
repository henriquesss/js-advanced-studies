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
        const success = userRepository.create(userData);

        return success;
    },
    update: (id, userData) => {
        const updatedUser = userRepository.update(id, userData);
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    },
    delete: (id) => {
        const success = userRepository.delete(id);
        if (!success) {
            throw new Error('User not found');
        }
        return success;
    }
}

module.exports = functions;