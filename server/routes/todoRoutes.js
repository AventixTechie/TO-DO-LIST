const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// All routes require authentication
router.get('/', todoController.requireAuth, todoController.getAllTodos);
router.post('/', todoController.requireAuth, todoController.createTodo);
router.get('/:id', todoController.requireAuth, todoController.getTodoById);
router.put('/:id', todoController.requireAuth, todoController.updateTodo);
router.delete('/:id', todoController.requireAuth, todoController.deleteTodo);

module.exports = router;


// Explanation:

// Import Express and create a router instance

// Import the todo controller functions

// Define routes for each CRUD operation:

// GET / - Get all todos

// POST / - Create a new todo

// GET /:id - Get a specific todo by ID

// PUT /:id - Update a todo by ID

// DELETE /:id - Delete a todo by ID

// Export the router to be used in server.js