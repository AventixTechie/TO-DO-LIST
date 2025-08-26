import React from 'react';

const Login = ({ onLogin }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body text-center">
            <h2 className="card-title mb-4">Welcome to Todo App</h2>
            <p className="card-text mb-4">Please log in to manage your tasks</p>
            <button 
              className="btn btn-primary"
              onClick={onLogin}
            >
              <i className="fab fa-google me-2"></i>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;