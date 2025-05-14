const express = require('express');
const {register,login} = require('../Controllers/authController');
const router = express.Router();
const validate = require('../middleware/verification.js')
router.post('/register', register);
router.post('/login', login);

module.exports = router;