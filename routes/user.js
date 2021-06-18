const express = require('express');
const auth = require('../controllers/user');
const router = express.Router();

router.post('/signin', auth.signIn);
router.post('/signup', auth.signUp);

module.exports = router;