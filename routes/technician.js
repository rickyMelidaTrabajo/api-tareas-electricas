const express = require('express');
const technicianController = require('../controllers/technician');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/get-technician', technicianController.getTechnician);
router.post('/set-technician', technicianController.setTechnician);
router.get('/get-technicians', auth, technicianController.getTechnicians);

module.exports = router;
