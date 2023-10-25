const express = require('express');
const { createRequest } = require('../controllers/userRequest.controller');
const authenticateUser = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/createRequest/:carId', authenticateUser, createRequest);

module.exports = router;
