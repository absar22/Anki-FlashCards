import {User }from '../models/User.js'
 import passport from 'passport'
  import validator from 'validator'

const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body

  
    if (!userName || !email || !password) {
      res.status(400).json({ error: 'All fields are required' })
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({ error: 'Invalid email' })
    }

    if (!validator.isLength(userName, { min: 3, max: 20 })) {
      res.status(400).json({ error: 'Invalid username' })

    }

    if (!validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0
    })) { 
     res.status(400).json({ error: 'Password must be at least 6 characters and include a number' })
    }

    const existing = await User.findOne(
      { 
        $or: [{ email }, { userName }]
       }
    )
    if (existing) {
      res.status(400).json({ error: 'User already exists' })
    }

    const newUser = await User.create({ userName, email, password })

    //  Auto login after signup
    req.login(newUser, (err) => {
      if (err) return next(err)
      res.status(201).json({ message: 'User registered successfully', user: newUser })
    })
  } catch (err) {
    console.error('Signup error:', err)

    res.status(500).json({ error: 'Internal server error' })
   
  }
}

const login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true // ✅ enables flash message from passport
  })(req, res, next)
  res.status(200).json({ message: 'Login successful' })

}

const logout = (req, res) => {
  req.logout(() => {
     res.status(200).json({message:"Logot succesfully"})
  })
}

export {register,login,logout}