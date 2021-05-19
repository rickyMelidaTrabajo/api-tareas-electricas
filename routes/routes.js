const express = require('express');

const taskRoute = require('./task');
const userRoute = require('./user');
const technicianRoute = require('./technician');

const router = express();

router.use('/task', taskRoute);
router.use('/user', userRoute);
router.use('/technician', technicianRoute);

module.exports = router;





