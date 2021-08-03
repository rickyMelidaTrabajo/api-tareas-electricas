const express = require('express');

const adminRoute = require('./admin');
const authRoute = require('./auth');
const taskRoute = require('./task');
const technicianRoute = require('./technician');
const userRoute = require('./user');

const router = express();

router.use('/admin', adminRoute);
router.use('/auth', authRoute);
router.use('/task', taskRoute);
router.use('/technician', technicianRoute);
router.use('/user', userRoute);


module.exports = router;
