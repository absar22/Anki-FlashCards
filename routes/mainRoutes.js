
const express = require('express')
const router = express.Router()
const mainController = require('../controller/mainController') // fix spelling
const { ensureAuth } = require('../middleware/auth');

// Only logged-in users can access home page
router.get('/', ensureAuth, mainController.getIndex);

module.exports = router
