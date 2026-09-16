import { Router } from 'express'

import { getIndex } from '../controller/mainController.js'

import { jwtVerify } from '../middleware/auth.js'

const mainRoutes = Router()

// Only logged-in users can access home page
mainRoutes.get('/', jwtVerify, getIndex)

export { mainRoutes }