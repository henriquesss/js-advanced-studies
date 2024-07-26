const express = require('express');
const app = express();
const port = 3000;

const userController = require('./userController');

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Create a new user
app.post('/users', userController.create);

// Read all users
app.get('/users', userController.list);

// Read a single user by ID
app.get('/users/:id', userController.listById);

// Update a user by ID
app.put('/users/:id', userController.update);

// Delete a user by ID
app.delete('/users/:id', userController.delete);
