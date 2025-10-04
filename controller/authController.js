const User = require('../models/User')
const passport = require('passport')

exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body
    const existing = await User.findOne({ $or: [{ email }, { userName }] })
    if (existing) {
      console.error('User already exists')
      return res.redirect('/signup')
    }

    const newUser = await User.create({ userName, email, password })

    // login after signup
    req.login(newUser, (err) => {
      if (err) return next(err)
      return res.redirect('/')
    })
  } catch (err) {
    console.error('Signup error:', err)
    res.redirect('/signup')
  }
}

exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/login')
  })
}
