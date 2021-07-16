const express = require('express');
const technicianController = require('../controllers/technician');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/test', technicianController.test);
router.get('/get-one', technicianController.getOne);
router.post('/add-technician', technicianController.addTechnician);
router.get('/get-technicians', auth, technicianController.getTechs);

module.exports = router;
