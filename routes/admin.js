const express = require('express');
const auth = require('../controllers/admin');
const router = express.Router();

router.post('/signin', auth.signIn);
router.get('/verify-token', auth.verifyToken);

module.exports = router;
