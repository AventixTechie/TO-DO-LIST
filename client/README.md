# Full-Stack To-Do App ✅

A simple Full-Stack To-Do List application where users can create, read, update, and delete tasks.
This project demonstrates integration between React frontend and Node.js/Express backend using RESTful APIs.

# 🎯 Project Overview

The app allows users to:

Create a task with title, description, and optional status

View all tasks in a list

Update a task (edit title or description)

Delete a task

It is a great starting project for learning:

React component-based architecture

Node.js with Express for backend APIs

RESTful API integration

Full-stack CRUD operations

# 🛠 Tech Stack

Frontend: React (create-react-app)

Backend: Node.js + Express

Database: In-memory array (optional: MongoDB)

HTTP: REST APIs

# 📂 Folder Structure
todo-app/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.js
│   │   │   └── TodoList.js
│   │   ├── App.js
│   │   └── index.js
├── server/                # Node.js backend
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── models/            # Optional if MongoDB used
│   │   └── todoModel.js
│   └── server.js
└── README.md

# 🌐 Backend API Endpoints
Method	Endpoint	Description
GET	/api/todos	Get all todos
GET	/api/todos/:id	Get a single todo
POST	/api/todos	Create a new todo
PUT	/api/todos/:id	Update a todo by ID
DELETE	/api/todos/:id	Delete a todo by ID

# Sample Todo Object:

{
  "id": "uuid-or-mongoid",
  "title": "Finish the assignment",
  "description": "Complete the full-stack todo list app",
  "completed": false
}

# 🚀 Getting Started
1. Clone the repository
git clone https://github.com/username/todo-app.git
cd todo-app

2. Install dependencies

Backend:

cd server
npm install


Frontend:

cd ../client
npm install

3. Run the application

Backend (API server):

cd server
npm start


Frontend (React app):

cd client
npm start


Open http://localhost:3000
 to view the app in your browser.
The React app communicates with the backend APIs to perform CRUD operations.

# ⚡ Features

Add new tasks

View all tasks

Edit tasks

Delete tasks

Dynamic frontend updates using React state

RESTful API handling on the backend

# 💡 Notes

node_modules/ are excluded via .gitignore

Environment variables can be used for backend configuration (.env)

Optional: Integrate MongoDB for persistent storage


































# How the Application Works
Backend API: The Node.js/Express server provides RESTful endpoints for CRUD operations on todos

Frontend: The React app consumes these APIs to display and manage todos

# Data Flow:

User interacts with the React UI (adds, edits, deletes todos)

React makes HTTP requests to the Express server

Server processes requests and updates the in-memory data store

Server sends responses back to React

React updates its state and re-renders the UI

# Key Features:

Create new todos with title and optional description

View all todos in a list

Edit existing todos

Delete todos

Mark todos as complete/incomplete

Responsive design with Bootstrap