import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   checkAuth();
  //   if (user) {
  //     fetchTodos();
  //   }
  // }, [user]);

   useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/user', {
        credentials: 'include',
         // Prevent caching of auth check
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }else if (response.status === 401) {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleLogin = () => {
    // Add a timestamp parameter to prevent caching
    const timestamp = new Date().getTime();
    // Redirect to Google login
    //window.location.href = 'http://localhost:5000/auth/google';
     window.location.href = `http://localhost:5000/auth/google?t=${timestamp}`;
  };

  const handleLogout = async () => {
  try {
     // Clear frontend storage
      localStorage.clear();
      sessionStorage.clear();
      // Call backend logout
    await fetch('http://localhost:5000/auth/logout', {
      credentials: 'include',
      method: 'GET'
    });
    setUser(null);
    setTodos([]);
  } catch (error) {
    console.error('Error logging out:', error);
    // Still clear state even if logout API fails
      setUser(null);
      setTodos([]);
      window.location.reload();
  }
};


  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      {user ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-center mb-0">My Todo List</h1>
            <div className="d-flex align-items-center">
              <span className="me-3">Hello, {user.displayName}</span>
              <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <TodoForm onAdd={handleAddTodo} />
              <TodoList 
                todos={todos} 
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
                onRefresh={fetchTodos}
              />
            </div>
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

// Explanation:

// Import React and necessary hooks

// Import TodoForm and TodoList components

// Import Bootstrap for styling

// Import custom CSS

// Create the main App component with state for todos

// Use useEffect to fetch todos when the component mounts

// Define fetchTodos function to get todos from the backend API

// Define handlers for adding, updating, and deleting todos

// Render the UI with a container, header, form, and list components

// Pass necessary props to child components