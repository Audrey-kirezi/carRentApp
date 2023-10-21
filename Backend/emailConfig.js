const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'audreykirezi100@gmail.com',
    pass: '#Audreykirezi11%',
  },
});

module.exports = transporter;
