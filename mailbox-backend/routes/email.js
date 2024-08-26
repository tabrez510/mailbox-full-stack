const express = require('express');
const userAuth = require('../middlewares/auth');
const emailControllers = require('../controllers/email');

const router = express.Router();

router.post('/send', userAuth.authenticate, emailControllers.sendEmail);
router.get('/sent', userAuth.authenticate, emailControllers.getSentEmails);
router.get('/received', userAuth.authenticate, emailControllers.getReceivedEmails);
router.get('/received/:emailId', userAuth.authenticate, emailControllers.getReceivedEmailDetails);
router.get('/sent/:emailId', userAuth.authenticate, emailControllers.getSentEmailDetails);

module.exports = router;
