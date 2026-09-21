import { Router } from 'express'
import { createCardSchema } from '../validators/cardValidator.js'
import {createCard,showAllCards,updateCard,deleteCard,getStudy } from '../controller/cardController.js'
import { jwtVerify } from '../middleware/auth.js'

const cardRoutes = Router()


// Get all cards
cardRoutes.get('/get-all-cards', showAllCards)

// Create card
cardRoutes.post('/create-card', jwtVerify, validate(createCardSchema), createCard)

// Update card
cardRoutes.put('/cards/:id', updateCard)

// Delete card
cardRoutes.delete('/cards/:id', deleteCard)

// Study mode
cardRoutes.get('/study', getStudy)


export { cardRoutes }