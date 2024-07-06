const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/protected-route', authenticateToken, authController.verify);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;