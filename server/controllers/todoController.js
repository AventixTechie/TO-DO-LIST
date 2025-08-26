const { v4: uuidv4 } = require('uuid');

// In-memory storage for todos with user association
let todos = [];

// Middleware to check authentication
exports.requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Authentication required' });
};

exports.getAllTodos = (req, res) => {
  // Return only todos for the authenticated user
  const userTodos = todos.filter(todo => todo.userId === req.user.id);
  res.json(userTodos);
};

exports.getTodoById = (req, res) => {
  const todo = todos.find(t => t.id === req.params.id && t.userId === req.user.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
};

exports.createTodo = (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
    userId: req.user.id // Associate todo with user
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const todoIndex = todos.findIndex(t => t.id === id && t.userId === req.user.id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    title: title || todos[todoIndex].title,
    description: description !== undefined ? description : todos[todoIndex].description,
    completed: completed !== undefined ? completed : todos[todoIndex].completed
  };

  res.json(todos[todoIndex]);
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id === id && t.userId === req.user.id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos = todos.filter(t => t.id !== id);
  res.json({ message: 'Todo deleted successfully' });
};



// Explanation:

// Import UUID library to generate unique IDs for todos

// Create an in-memory array to store todos (this would be a database in production)

// getAllTodos function returns all todos as JSON

// getTodoById finds a specific todo by ID or returns 404 if not found

// createTodo validates input, creates a new todo with a unique ID, adds it to the array, and returns it

// updateTodo finds a todo by ID, updates its properties, and returns the updated todo

// deleteTodo finds a todo by ID, removes it from the array, and returns a success message