// MAIL AUTOMATION (RECIPIENT TO POTENTIAL DONORS)
const nodemailer = require("nodemailer");
require('dotenv').config()

function encrypt(id) {
  const encrypted_id = (id * 8723456789123456) + 42;
  return encrypted_id;
}


// Async function enables allows handling of promises with await
async function sendMailToPotentialDonors(donation_id, potentialDonors, recipientData) {

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.RSB_EMAIL,
      pass: process.env.RSB_PASSWORD,
    },
    connectionTimeout: 5 * 60 * 30000,
  });


  const encrypted_donation_id = encrypt(donation_id);
  const LINK = `localhost:3000/donorresponse?q=${encrypted_donation_id}&recipient_latitude=${recipientData.latitude}&recipient_longitude=${recipientData.longitude}`;

  console.log(LINK)

  for (let i = 0; i < potentialDonors.length; i++) {
    const potentialDonor = potentialDonors[i];

    // Define message
    const html = `
      <h1>Dear ${potentialDonor.name},</h1>
      <p>We hope this email finds you well. We're reaching out to you because someone is in need of blood and we have been informed that you may be a potential donor match. The details are as follows:</p>
      <ul>
          <li>Email: ${recipientData.email}</li>
          <li>Blood Type: ${recipientData.bloodType}</li>
          <li>Latitude: ${recipientData.latitude}</li>
          <li>Longitude: ${recipientData.longitude}</li>
          <li>Distance to cover: ${potentialDonor.distance.toFixed(2)} km</li>
      </ul>
      <p>If you are available and willing to donate blood, please let us know as soon as possible. Your donation would be greatly appreciated and could make a significant difference in their health and well-being.</p>
      <p>Click this link ${LINK} to Accept or Reject the blood request.</p>
      <p>Please be honest, as someone's life is at stake.</p>
      <p>Thank you for your consideration, and we look forward to hearing back from you soon.</p>
    `;

    const message = {
      from: '"Rakht Sashakt Bharat" <rakhtsashaktbharat@gmail.com>',
      // to: potentialDonor.email,
      to: 'shivendrachauhan1234@gmail.com',
      subject: "BLOOD REQUEST THROUGH RAKHT SAKSHAKT BHARAT",
      html,
    };

    // Send message inside transporter.sendEmail() and await info about send from promise:
    const info = await transporter.sendMail(message);

    console.log(info.messageId); // Random ID generated after successful send (optional)
    console.log(info.accepted); // Array of emails that were successful
    console.log(info.rejected); // Array of unsuccessful emails
  }

  return 'DONE BRO!';
}

module.exports = sendMailToPotentialDonors;
