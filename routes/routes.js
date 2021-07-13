const express = require('express');

const taskRoute = require('./task');
const userRoute = require('./user');
const technicianRoute = require('./technician');
const adminRoute = require('./admin');

const router = express();

router.use('/task', taskRoute);
router.use('/user', userRoute);
router.use('/technician', technicianRoute);
router.use('/admin', adminRoute);


module.exports = router;
