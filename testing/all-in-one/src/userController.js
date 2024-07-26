const userService = require('./userService');

const controllerFunctions = {
    list: (req, res) => {
        try {
            const users = userService.list();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    listById: (req, res) => {
        try {
            const user = userService.listById(parseInt(req.params.id));
            res.json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    
    create: (req, res) => {
        try {
            const newUser = userService.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    update: (req, res) => {
        try {
            const updatedUser = userService.update(parseInt(req.params.id), req.body);
            res.json(updatedUser);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    
    delete: (req, res) => {
        try {
            userService.delete(parseInt(req.params.id));
            res.status(204).end();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}


module.exports = controllerFunctions;