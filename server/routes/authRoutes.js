const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Реєстрація нового користувача
router.post('/register', authController.register);

// Логін користувача
router.post('/login', authController.login);

module.exports = router;