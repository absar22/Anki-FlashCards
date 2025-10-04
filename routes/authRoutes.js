const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { ensureGuest } = require('../middleware/auth');

// Auth pages
router.get('/login', ensureGuest, (req, res) => res.render('login'));
router.get('/signup', ensureGuest, (req, res) => res.render('signup'));

// Auth actions
router.post('/signup', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
