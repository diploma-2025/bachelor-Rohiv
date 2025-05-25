const router = require('express').Router();
const userRouter = require('../src/user/userRouter')
const appointmentRouter = require('../src/appointment/appointmentRouter')
const patientRouter = require('../src/patient/patientRouter')
const roleRouter = require('../src/role/roleRouter')
const templateRouter = require("../src/template/templateRouter");
const tabRouter = require("../src/tab/tabRouter");
const orderRouter = require("../src/order/orderRouter");

router.use('/users', userRouter);
router.use('/appointments', appointmentRouter);
router.use('/patients', patientRouter)
router.use('/roles', roleRouter)
router.use('/templates', templateRouter)
router.use('/tabs', tabRouter)
router.use('/orders', orderRouter)

module.exports = router;
