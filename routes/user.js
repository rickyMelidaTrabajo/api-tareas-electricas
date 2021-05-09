const express = require('express');
const auth = require('../controllers/user/auth');
const add = require('../controllers/user/add');
const verifySession = require('../controllers/user/sessionVerify');

const router = express.Router();

router.get('/verify-session', verifySession);
router.post('/auth', auth);
router.post('/add', add);

module.exports = router;