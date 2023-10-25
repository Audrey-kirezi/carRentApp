const CarRentalRequest = require("../models/carRental.model")
const {mailTransporter}= require("../utils/emailConfig")
const User = require("../models/user.model.js");

exports.viewAllRequests = async (req, res) => {
  try {
    const requests = await CarRentalRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching car rental requests" });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await CarRentalRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "approved";
    await request.save();
    const user = await User.findById(request.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const customerEmail = user.email;
    const mailOptions = {
      from: 'audreykirezi100@gmail.com',
      to: customerEmail,
      subject: 'Car Rental Request Approved',
      text: 'Your car rental request has been approved. You can proceed with the rental.',
    };

    mailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error:', error)
      } else {
        console.log('Email sent:', info.response)
      }
    })

    res.status(200).json({ message: "Request approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error approving car rental request" });
  }
};
exports.rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await CarRentalRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "rejected";
    await request.save();
    const user = await User.findById(request.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const customerEmail = user.email;
    const mailOptions = {
      from: 'audreykirezi100@gmail.com',
      to: customerEmail,
      subject: 'Car Rental Request Approved',
      text: 'Your car rental request has been approved. You can proceed with the rental.',
    };

    mailTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error:', error)
      } else {
        console.log('Email sent:', info.response)
      }
    })

    res.status(200).json({ message: "Request rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error rejecting car rental request" });
  }
};
