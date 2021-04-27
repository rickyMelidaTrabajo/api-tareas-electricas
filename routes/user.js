const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/test', userController.test);
router.post('/add', userController.add);

module.exports = router;