const User = require('../models/User')
const passport = require('passport')
const validator = require('validator')

exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body

    // ✅ Validation
    if (!userName || !email || !password) {
      req.flash('error_msg', 'All fields are required')
      return res.redirect('/signup')
    }

    if (!validator.isEmail(email)) {
      req.flash('error_msg', 'Please enter a valid email address')
      return res.redirect('/signup')
    }

    if (!validator.isLength(userName, { min: 3, max: 20 })) {
      req.flash('error_msg', 'Username must be between 3 and 20 characters')
      return res.redirect('/signup')
    }

    if (!validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0
    })) {
      req.flash('error_msg', 'Password must be at least 6 characters and include a number')
      return res.redirect('/signup')
    }

    // ✅ Check for existing user
    const existing = await User.findOne({ $or: [{ email }, { userName }] })
    if (existing) {
      req.flash('error_msg', 'User already exists')
      return res.redirect('/signup')
    }

    // ✅ Create new user
    const newUser = await User.create({ userName, email, password })

    // ✅ Auto login after signup
    req.login(newUser, (err) => {
      if (err) return next(err)
      req.flash('success_msg', 'Registration successful! Welcome 🎉')
      return res.redirect('/')
    })
  } catch (err) {
    console.error('Signup error:', err)
    req.flash('error_msg', 'Something went wrong. Please try again.')
    res.redirect('/signup')
  }
}

exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true // ✅ enables flash message from passport
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'You have logged out successfully')
    res.redirect('/login')
  })
}
