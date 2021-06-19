const express = require('express');
const technicianController = require('../controllers/technician');

const router = express.Router();

router.post('/test', technicianController.test);
router.get('/get-one', technicianController.getOne);
router.post('/add-technician', technicianController.addTechnician);

module.exports = router;
