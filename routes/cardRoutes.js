
const express = require('express')
const router = express.Router()
const cardController = require('../controller/cardController')

// Show form (GET)
router.get('/createCards', cardController.showCreateForm)

// Get all the cards (GET)
router.get('/cards', cardController.showAllCards)

// Handle form submit (POST)
router.post('/cards', cardController.createCard)


// Add the Update Route (PUT)
router.put('/cards/:id', cardController.updateCard)

// Show editedCards
router.get('/cards/:id/edit', cardController.showEditCardForm)


// DELETE Card
router.delete('/cards/:id', cardController.deleteCard)


module.exports = router
