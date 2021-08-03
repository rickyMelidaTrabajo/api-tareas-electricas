const express = require('express');
const taskController = require('../controllers/task');
const auth = require('../middlewares/auth');
const router = express.Router();

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './upload' });

router.post('/set-pending-task', auth, md_upload, taskController.setPendingTask);
router.post('/set-finished-task', md_upload, auth, taskController.setFinishedTask);
router.get('/get-tasks', auth, taskController.getTasks);
router.get('/get-pending-tasks', auth, taskController.getPendingTasks);
router.get('/get-finished-tasks', auth, taskController.getFinishedTasks);
router.get('/get-task-by/:type?/:data?', taskController.getTaskBy);

router.get('/image-task/:id?/:image?', taskController.getImage);

module.exports = router;
