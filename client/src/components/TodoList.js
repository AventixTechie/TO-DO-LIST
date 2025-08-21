import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, {
        completed: !currentStatus
      });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, {
        title: editTitle,
        description: editDescription
      });
      fetchTodos();
      cancelEditing();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="list-group">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`list-group-item ${todo.completed ? 'list-group-item-secondary' : ''}`}
        >
          {editingId === todo.id ? (
            <div className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="form-control mb-2"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleUpdate(todo.id)}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className={`mb-1 ${todo.completed ? 'text-decoration-line-through' : ''}`}>
                  {todo.title}
                </h5>
                <p className="mb-1 text-muted">{todo.description}</p>
              </div>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id, todo.completed)}
                  />
                  <label className="form-check-label">Completed</label>
                </div>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => startEditing(todo)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;