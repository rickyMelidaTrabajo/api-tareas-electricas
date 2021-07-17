const express = require('express');
const usr = require('../controllers/user');
const router = express.Router();

router.post('/signin', usr.signIn);
router.post('/signup', usr.signUp);
router.get('/get-users', usr.getUsers);

module.exports = router;
