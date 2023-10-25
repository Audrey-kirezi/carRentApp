const express = require('express');
const router = express.Router();
const { viewAllRequests, approveRequest, rejectRequest } = require('../controllers/adminRequests.controller');
const {authenticateAdmin} = require('../middleware/admin.middleware');

router.get('/all', authenticateAdmin, viewAllRequests);
router.put('/approve/:requestId', authenticateAdmin, approveRequest);
router.put('/reject/:requestId', authenticateAdmin, rejectRequest);

module.exports = router;
