const express = require('express');
const userAuth = require('../middlewares/auth');
const emailControllers = require('../controllers/email');

const router = express.Router();

router.post('/send-email', userAuth.authenticate, emailControllers.SendEmail);

module.exports = router;
