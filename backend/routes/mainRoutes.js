import { Router } from 'express'

import { getIndex } from '../controller/mainController.js'

import { ensureAuth } from '../middleware/auth.js'

const mainRoutes = Router()

// Only logged-in users can access home page
mainRoutes.get('/', ensureAuth, getIndex)

export { mainRoutes }