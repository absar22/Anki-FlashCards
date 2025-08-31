
const express = require('express')
const router = express.Router()
const cardController = require('../controller/cardController')

// Show form (GET)
router.get('/createCards', cardController.showCreateForm)

// Handle form submit (POST)
router.post('/cards', cardController.createCard)

module.exports = router
