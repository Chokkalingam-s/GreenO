const nodemailer = require('nodemailer');
const crypto = require('crypto');
const moment = require('moment'); 

const otpStore = {}; 

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

const OTP_EXPIRY_TIME = 5; 

async function sendOtp(email) {
  const otp = crypto.randomInt(100000, 999999).toString(); 
  const expiry = moment().add(OTP_EXPIRY_TIME, 'minutes').toDate(); 
  otpStore[email] = { otp, expiry }; 

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in ${OTP_EXPIRY_TIME} minutes.`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Mail sent: %s', info.messageId); 
    return true; 
  } catch (error) {
    console.error('Error sending OTP:', error); 
    return false; 
  }
}

async function verifyOtp(email, otp) {
  const otpData = otpStore[email];
  if (otpData) {
    const { otp: storedOtp, expiry } = otpData;
    if (storedOtp === otp && moment().isBefore(expiry)) {
      delete otpStore[email]; 
      return true; 
    }
  }
  return false; 
}

module.exports = { sendOtp, verifyOtp };
