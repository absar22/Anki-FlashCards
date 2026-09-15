import { Router } from 'express'

import {createCard,showAllCards,updateCard,deleteCard,getStudy } from '../controller/cardController.js'

const cardRoutes = Router()


// Get all cards
cardRoutes.get('/cards', showAllCards)

// Create card
cardRoutes.post('/cards', createCard)

// Update card
cardRoutes.put('/cards/:id', updateCard)

// Delete card
cardRoutes.delete('/cards/:id', deleteCard)

// Study mode
cardRoutes.get('/study', getStudy)


export { cardRoutes }