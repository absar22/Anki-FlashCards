const express = require('express')
const router = express.Router()
const mainControler = require('../controller/mainController')

router.get('/', mainControler.getIndex)

module.exports = router
