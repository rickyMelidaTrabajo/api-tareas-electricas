const express = require('express');
const taskController = require('../controllers/task/task');

const router = express.Router();

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './upload' });

router.post('/test', taskController.test);
router.post('/add-pending-task',md_upload, taskController.addPendingTask);
router.post('/add-finished-task', md_upload, taskController.addFinishedTask);

module.exports = router;