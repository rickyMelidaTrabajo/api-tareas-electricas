const express = require('express');
const technicianController = require('../controllers/technician/technician');

const router = express.Router();

router.post('/test', technicianController.test);
router.get('/get', technicianController.get);

module.exports = router;