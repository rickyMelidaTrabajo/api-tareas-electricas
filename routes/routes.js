const express = require('express');

const taskRoute = require('./task');
const userRoute = require('./user');
const technicianRoute = require('./technician');

const router = express();

router.use('/task', taskRoute);
router.use('/auth', userRoute);
router.use('/tech', technicianRoute);

module.exports = router;





