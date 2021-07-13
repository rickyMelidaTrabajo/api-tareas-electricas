const express = require('express');
const auth = require('../controllers/admin');
const router = express.Router();

router.post('/signin', auth.signIn);

module.exports = router;
