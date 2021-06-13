const express = require('express');
const taskController = require('../controllers/task');
const auth = require('../middlewares/auth');
const router = express.Router();

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './upload' });

router.post('/add-pending-task', auth, md_upload, taskController.addPendingTask);
router.post('/add-finished-task', md_upload, auth, taskController.addFinishedTask);
router.get('/get-pending-tasks', auth, taskController.showPendingTasks);
router.get('/get-finished-tasks', auth, taskController.showFinishedTasks);

module.exports = router;