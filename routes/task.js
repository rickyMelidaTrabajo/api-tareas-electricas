const express = require('express');
const taskController = require('../controllers/task/task');

const router = express.Router();

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './upload' });

router.post('/test', taskController.test);

module.exports = router;