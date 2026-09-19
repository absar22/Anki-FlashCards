import { Router } from 'express'

import {register,login,logout} from '../controller/authController.js'

import { jwtVerify } from '../middleware/auth.js'
import { registerSchema, loginSchema } from '../validators/authValidator.js'
import { validate } from '../middleware/validate.js'

const authRoutes = Router()


// Register
authRoutes.post('/signup',  validate(registerSchema), register)

// Login
authRoutes.post('/login', validate(loginSchema), login)

// Logout
authRoutes.post('/logout', jwtVerify, logout)


export { authRoutes }