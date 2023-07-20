const otpGenerator = require('otp-generator');
const nodemailer = require("nodemailer");
require('dotenv').config()

var otpCode = 0;

async function sendOtp(email) {

    otpCode = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    console.log(otpCode)

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.RSB_EMAIL,
            pass: process.env.RSB_PASSWORD,
        },
        connectionTimeout: 5 * 60 * 10000,
    });

    const message = {
        from: '"Rakht Sashakt Bharat" <rakhtsashaktbharat@gmail.com>',
        to: email,
        subject: 'OTP for Email Verification',
        text: `Your OTP code to verify your email is: ${otpCode}`
    };

    try {
        const info = await transporter.sendMail(message);
        console.log('Email sent:', info.response);
        return 'OTP sent successfully';
    } catch (error) {
        console.log(error);
        throw new Error('Failed to send OTP: ' + error.message);
    }
}


async function validateOtp(otp) {
    return otp === otpCode;
}


module.exports = {
    sendOtp,
    validateOtp,
};