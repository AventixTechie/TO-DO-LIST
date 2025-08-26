require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT =  5000;

// Session middleware MUST come before passport middleware
app.use(session({
 secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Verify environment variables are loaded
console.log('Environment variables check:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set');
console.log('SESSION_SECRET:', process.env.SESSION_SECRET ? 'Set' : 'Not set');
// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true
}, //(accessToken, refreshToken, profile, done) => {
  function(request, accessToken, refreshToken, profile, done) {
  // Here you would typically find or create a user in your database
  console.log('Google profile received:', profile);
  return done(null, profile);
}));

// Serialize user into session
passport.serializeUser((user, done) => {
  // Store minimal info in session (like user.id or email)
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  // Normally you’d fetch user from DB here
  // For now just pass back an object with id
  done(null, { id });
});

// Routes
app.use('/api/todos', todoRoutes);
app.use('/auth', authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Make sure you have set up your .env file with:');
  console.log('- GOOGLE_CLIENT_ID');
  console.log('- GOOGLE_CLIENT_SECRET');
  console.log('- SESSION_SECRET');
});


// Explanation:

// Import Express framework for creating the server

// Import body-parser to handle JSON data in requests

// Import CORS to enable cross-origin requests (important for frontend-backend communication)

// Import our todo routes

// Create an Express application instance

// Set the port to 5000

// Use CORS middleware to allow frontend requests

// Use body-parser middleware to parse JSON request bodies

// Mount the todo routes at the '/api/todos' endpoint

// Start the server and listen on the specified port 

// body-parser → middleware to read JSON (or form data) from request bodies.

// In new Express apps → just use app.use(express.json()).

// Without it, req.body will always be undefined.
