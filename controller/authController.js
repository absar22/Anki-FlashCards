const User = require('../models/User')
const passport = require('passport')

// Register user with automatic login
exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body
    
    // Create the new user
    const newUser = await User.create({ userName, email, password })
    
    // Automatically log them in after registration
    req.login(newUser, (err) => {
      if (err) {
        console.error('Login after signup failed:', err)
        return next(err)
      }
      // Redirect to home page after successful auto-login
      res.redirect('/')
    })
    
  } catch (err) {
    console.error('Signup error:', err)
    // If email/username already exists, redirect back to signup
    res.redirect('/signup')
  }
}

// Login user
exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res, next)
}

// Logout user
exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/login')
  })
}