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



































# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)






