const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');
//register api
router.post('/register', registerUser);
module.exports = router;