import React, { useState } from 'react';

const TodoList = ({ todos, onUpdate, onDelete, onRefresh }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        onDelete(id);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !currentStatus
        })
      });
      
      if (response.ok) {
        const updatedTodo = await response.json();
        onUpdate(updatedTodo);
      }
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
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription
        })
      });
      
      if (response.ok) {
        const updatedTodo = await response.json();
        onUpdate(updatedTodo);
        cancelEditing();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Your Tasks</h2>
        <button className="btn btn-sm btn-outline-secondary" onClick={onRefresh}>
          Refresh
        </button>
      </div>
      
      {todos.length === 0 ? (
        <p className="text-center text-muted">No tasks yet. Add a task to get started!</p>
      ) : (
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
                    {todo.description && (
                      <p className="mb-1 text-muted">{todo.description}</p>
                    )}
                    <small className="text-muted">
                      Created: {new Date(todo.createdAt).toLocaleDateString()}
                    </small>
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
      )}
    </div>
  );
};

export default TodoList;