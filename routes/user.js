const express = require('express');
const user = require('../controllers/user');
const router = express.Router();

router.get('/get-users', user.getUsers);

module.exports = router;
