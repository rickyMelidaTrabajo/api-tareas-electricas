const express = require('express');
const admin = require('../controllers/admin');
const router = express.Router();


router.post('/signin', admin.signIn);
router.get('/verify-token', admin.verifyToken);
router.get('/get-hours/:username?', admin.getHours);


module.exports = router;
