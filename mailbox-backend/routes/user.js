const express = require('express');

const userControllers = require('../controllers/user');

const router = express.Router();

router.post('/login', userControllers.validateUser);
router.post('/signup', userControllers.createUser);
router.get('/get-user/:id', userControllers.getUser);

module.exports = router;