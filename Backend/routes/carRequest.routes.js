const express = require('express');
const router = express.Router();
const{carRentalRequests,approveRequests,rejectRequests}=require("../controllers/carRequest.controllers")


router.get('/carRequests',carRentalRequests);
router.put('/approveRequest/:requestId',approveRequests);
router.put('/rejectRequest/:requestId',rejectRequests);

module.exports = router;
