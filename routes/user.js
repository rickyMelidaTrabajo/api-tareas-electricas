const express = require('express');
const auth = require('../controllers/user/auth');
const add = require('../controllers/user/add');

const router = express.Router();

router.post('/auth', auth);
router.post('/add', add);

module.exports = router;