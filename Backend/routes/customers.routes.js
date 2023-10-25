const express = require('express');
const { viewAllUsers, removeCustomer } = require("../controllers/customer.controllers");
const {authenticateAdmin} = require('../middleware/admin.middleware'); 
const router = express.Router();

router.get('/all', authenticateAdmin, viewAllUsers)
router.delete('/removeCustomer/:userId', authenticateAdmin, removeCustomer)

module.exports = router;

