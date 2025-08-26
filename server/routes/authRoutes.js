const express = require('express');
const passport = require('passport');
const router = express.Router();

// Auth login
router.get('/login', (req, res) => {
  res.send('Login page');
});

// Enhanced logout that also clears Google session
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
         console.error('Error destroying session:', err);
        return res.status(500).json({ message: 'Error logging out' });
      }

      res.clearCookie('connect.sid');
      res.redirect('http://localhost:3000'); // just back to your app
    });
  });
});


// Auth with Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account' 
}));

// Callback route for Google to redirect to
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect('http://localhost:3000');
  }
);

// Check if user is authenticated
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user.id,
      displayName: req.user.displayName,
      emails: req.user.emails
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;