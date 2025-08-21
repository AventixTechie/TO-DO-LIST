const { v4: uuidv4 } = require('uuid');

// In-memory storage for todos
let todos = [];

exports.getAllTodos = (req, res) => {
  res.json(todos);
};

exports.getTodoById = (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
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
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    title: title || todos[todoIndex].title,
    description: description || todos[todoIndex].description,
    completed: completed !== undefined ? completed : todos[todoIndex].completed
  };

  res.json(todos[todoIndex]);
};

exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos = todos.filter(t => t.id !== id);
  res.json({ message: 'Todo deleted successfully' });
};