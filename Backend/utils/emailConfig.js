const nodemailer = require('nodemailer');
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587, 
    secure: true, 
    auth: {
        user: 'audreykirezi100@gmail.com',
        pass: 'iwvi wbbd dolt cezh'
    }
})

exports.mailTransporter = mailTransporter;