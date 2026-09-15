import { Router } from 'express'

import {register,login,logout} from '../controller/authController.js'

import { ensureGuest } from '../middleware/auth.js'

const authRoutes = Router()


// Register
authRoutes.post('/signup', ensureGuest, register)

// Login
authRoutes.post('/login', ensureGuest, login)

// Logout
authRoutes.post('/logout', logout)


export { authRoutes }