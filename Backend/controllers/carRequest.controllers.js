const Admin = require("../models/admin.model");
const Car = require("../models/car.model");
const User= require("../models/user.model")
const CarRentalRequest = require('../models/carRentalRequest');
const authenticateAdmin = require('../middleware/authenticateAdmin'); 

exports.carRentalRequests=(authenticateAdmin, async (req, res) => {
    try {
      const requests = await CarRentalRequest.find().populate('user car');
      res.status(200).json(requests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching car rental requests' });
    }
  })
  exports.approveRequests=(authenticateAdmin, async (req, res) => {
    try {
      const { requestId } = req.params;
      const request = await CarRentalRequest.findById(requestId);
  
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
      request.status = 'approved';
      await request.save();
  
      res.status(200).json({ message: 'Request approved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error approving car rental request' });
    }
  })
  exports.rejectRequests=(authenticateAdmin, async (req, res) => {
    try {
      const { requestId } = req.params;
      const request = await CarRentalRequest.findById(requestId);
  
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
  
      request.status = 'rejected';
      await request.save();
  
      res.status(200).json({ message: 'Request rejected successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error rejecting car rental request' });
    }
  })