import { Router } from 'express'

import {register,login,logout, updateCurrentPassword, updateUser, getCurrentUser, refreshAccessToken} from '../controller/authController.js'

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

// updatePassword
authRoutes.patch('/update-password', jwtVerify, updateCurrentPassword)

// updateUser

authRoutes.put('/update-user', jwtVerify, updateUser)

// get currentUser
authRoutes.get('/current-user', jwtVerify, getCurrentUser)


// get access-token
authRoutes.post('/refresh-token', refreshAccessToken)


export { authRoutes }