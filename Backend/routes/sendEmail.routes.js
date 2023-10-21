const express = require('express')
const CarRentalRequest = require('../models/carRental.model')
const authenticateAdmin = require('../middleware/authenticateAdmin')
const transporter = require('../emailConfig')
const router = express.Router()


router.put('/approveRequest/:requestId', authenticateAdmin, async (req, res) => {
  try {
    const { requestId } = req.params

    const request = await CarRentalRequest.findById(requestId)

    if (!request) {
      return res.status(404).json({ message: 'Request not found' })
    }

    request.status = 'approved'
    await request.save()

    const customerEmail = request.user.email;
    const mailOptions = {
      from: 'audreykirezi100@gmail.com',
      to: customerEmail,
      subject: 'Car Rental Request Approved',
      text: 'Your car rental request has been approved. You can proceed with the rental.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error:', error)
      } else {
        console.log('Email sent:', info.response)
      }
    })

    res.status(200).json({ message: 'Request approved successfully' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error approving car rental request' })
  }
});

router.put('/rejectRequest/:requestId', authenticateAdmin, async (req, res) => {
    try {
      const { requestId } = req.params;
  
      const request = await CarRentalRequest.findById(requestId);
  
      if (!request) {
        return res.status(404).json({ message: 'Request not found' })
      }
  
      request.status = 'rejected'
      await request.save()
  
      const customerEmail = request.user.email
      const mailOptions = {
        from: 'audreykirezi100@gmail.com',
        to: customerEmail,
        subject: 'Car Rental Request Rejected',
        text: 'Your car rental request has been rejected. Please try again',
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email sending error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      res.status(200).json({ message: 'Request rejected successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error rejecting car rental request' });
    }
  });


module.exports = router;
