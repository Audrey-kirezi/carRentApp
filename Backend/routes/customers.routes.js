const express = require('express');
const Customer = require('../models/customer');
const authenticateAdmin = require('../middleware/authenticateAdmin'); 
const router = express.Router();
router.get('/customers');

router.delete('/removeCustomer/:customerId');

module.exports = router;
