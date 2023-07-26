const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const sendMailToPotentialDonors = require('./mailAutomation');
const { sendOtp, validateOtp } = require('./otpValidation');


const db = mysql.createConnection({
   host: 'rsb-db.cwdk93qv9rtl.ap-south-1.rds.amazonaws.com',
  port: process.env.PORT || 3030,
  user: 'root',
  password: 'password',
  database: 'rakhtsashaktdatabase',
});

// connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});


// create an instance of express
const app = express();

// using cors as middleware
app.use(cors());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));






// API ENDPOINTS AHEAD, SCROLL CAREFULLY














// AUTOMATIC LOCATION UPDATION FOR DONORS

app.post('/api/update-donor-live-location', (req, res) => {
  const { userRole, email, latitude, longitude } = req.body;

  if (userRole !== 'Donor') {
    return res.status(400).send('Invalid user role');
  }

  const sql = 'UPDATE Donors SET latitude = ?, longitude = ? WHERE email = ?';
  const values = [latitude, longitude, email];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating donor location');
    }

    console.log(`Updated location for donor with email ${email}`);
    res.sendStatus(200);
  });
});



// RETRIEVE DONOR DATA FROM DATABASE

app.get('/api/donor-data', (req, res) => {
  const sql = 'SELECT * FROM donors';

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});


// RETRIEVE RECIPIENT DATA FROM DATABASE

app.get('/api/recipient-data', (req, res) => {
  const sql = 'SELECT * FROM recipients';

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});


// RETRIEVE DONATIONS DATA FROM DATABASE

app.get('/api/donation-data', (req, res) => {
  const sql = 'SELECT * FROM donations';

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});


// INSERT DONOR DATA INTO DATABASE

app.post('/api/donors', (req, res) => {
  const { name, email, password, phone, blood_type, latitude, longitude } = req.body;
  const sql = 'INSERT INTO donors (name, email, password, phone, blood_type, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [name, email, password, phone, blood_type, latitude, longitude];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving donor data');
    } else {
      console.log('Donor data saved successfully');
      res.status(200).send('Donor data saved successfully');
    }
  });
});


// INSERT RECIPIENT DATA INTO DATABASE

app.post('/api/recipients', (req, res) => {
  const { name, email, password, phone, blood_type, latitude, longitude } = req.body;
  const sql = 'INSERT INTO recipients (name, email, password, phone, blood_type, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [name, email, password, phone, blood_type, latitude, longitude];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving donor data');
    } else {
      console.log('Recipient data saved successfully');
      res.status(200).send('Recipient data saved successfully');
    }
  });
});


// INSERT DONATIONS DATA INTO DATABASE

app.post('/api/donations', (req, res) => {
  const recipientEmail = req.body.recipient_email;
  const sql = 'INSERT INTO donations (recipient_email) VALUES (?)';
  const values = [recipientEmail];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving donation data');
    } else {
      const donationId = result.insertId;
      console.log(`Donation data saved successfully with id ${donationId}`);
      res.status(200).json({ donation_id: donationId });
    }
  });
});


// INSERT REQUESTED DONORS EMAILS (DONATIONS) DATA INTO DATABASE

app.post('/api/requested-donors', (req, res) => {
  const { donation_id, donor_email } = req.body;
  const sql = 'INSERT INTO requested_donors_emails (donation_id, email) VALUES (?, ?)';
  const values = [donation_id, donor_email];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving requested donor data');
    } else {
      console.log('Requested donor data saved successfully');
      res.status(200).send('Requested donor data saved successfully');
    }
  });
});



// SEND AUTOMATED MAIL TO REQUESTED DONORS

app.post('/api/send-mail', (req, res) => {
  const { donation_id, potentialDonors, recipientData } = req.body;

  // Call sendMailToPotentialDonors function with the mailList, potentialDonors and recipientData
  sendMailToPotentialDonors(donation_id, potentialDonors, recipientData)
    .then(info => {
      console.log('Mail sent successfully!', info);
      res.status(200).send('All donors have been notified');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error sending email');
    });

});



// A DONOR HAS ACCEPTED DONATION REQUEST

app.put('/donation-accepted', (req, res) => {
  const { donationId, email } = req.body;

  const sql = 'CALL donation_accepted(?, ?)';
  const values = [donationId, email];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating status');
    } else {
      res.status(200).send('Donation request accepted!');
    }
  });
});


// RETRIEVE STATUS OF DONATION (CLOSING DONATION REQUEST)

app.get('/check-donation-status', (req, res) => {
  const donationId = req.query.donationId;
  const sql = 'SELECT status FROM donations WHERE donation_id = ?';
  db.query(sql, [donationId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});


// GENERATE OTP TO VERIFY USER EMAIL

app.post('/send-otp', async (req, res) => {
  const email = req.body.email;
  try {
    const response = await sendOtp(email);
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to send OTP');
  }
});


// VALIDATE ENTERED OTP

app.post('/validate-otp', async (req, res) => {
  const otp = req.body.otp;
  try {
    const isValid = await validateOtp(otp);
    if (isValid) {
      console.log('Valid');
      res.send('OTP code is valid');
    } else {
      console.log('Invalid');
      res.send('Invalid OTP code');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to validate OTP');
  }
});


// AUTHENTICATE DONOR

app.post('/api/donor/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'CALL authenticate_donor(?, ?)';
  const values = [email, password];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error authenticating donor');
    } else if (results.length === 0 || results[0].length === 0) {
      console.log('Not authenticated.');
      res.status(401).send('Not authenticated.');
    } else {
      const donorName = results[0][0].name;
      console.log(`Authenticated as ${donorName}`);
      res.status(200).send(`Authenticated as ${donorName}`);
    }
  });
});



// AUTHENTICATE RECIPIENT 

app.post('/api/recipient/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'CALL authenticate_recipient(?, ?)';
  const values = [email, password];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error authenticating recipient');
    } else if (results.length === 0 || results[0].length === 0) {
      console.log('Not authenticated.');
      res.status(401).send('Not authenticated.');
    } else {
      const recipientName = results[0][0].name;
      console.log(`Authenticated as ${recipientName}`);
      res.status(200).send(`Authenticated as ${recipientName}`);
    }
  });
});


// AUTHENTICATE ADMIN  

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'CALL authenticate_admin(?, ?)';
  const values = [email, password];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error authenticating admin');
    } else if (results.length === 0 || results[0].length === 0) {
      console.log('Not authenticated.');
      res.status(401).send('Not authenticated.');
    } else {
      const adminName = results[0][0].name;
      console.log(`Authenticated as ${adminName}`);
      res.status(200).send(`Authenticated as ${adminName}`);
    }
  });
});




// RESET PASSWORD OF USERS

app.put('/change-password', (req, res) => {
  const { userRole, email, newPassword } = req.body;

  // validate input
  if (!userRole || !email || !newPassword) {
    return res.status(400).send('Invalid input');
  }

  // Check if user with that role exists or not
  let checkIdExistence = null;

  if (userRole === 'Admin') {
    checkIdExistence = `SELECT admin_id FROM admins WHERE email = ?`;
  } else if (userRole === 'Donor') {
    checkIdExistence = `SELECT donor_id FROM donors WHERE email = ?`;
  } else if (userRole === 'Recipient') {
    checkIdExistence = `SELECT recipient_id FROM recipients WHERE email = ?`;
  }

  // Execute the query to check if the user exists
  db.query(checkIdExistence, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    if (results.length === 0) {
      return res.status(400).send('User does not exist');
    }
  });



  // Call database procedure to update password
  const sql = 'CALL change_password(?, ?, ?)';
  const values = [userRole, email, newPassword];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to change password');
    } else {
      return res.status(200).send('Password changed successfully');
    }
  });
});



// GET POTENTIAL DONORS

app.get('/api/potential-donor', (req, res) => {
  const { bloodType, latitude, longitude } = req.query;

  const sql = 'CALL get_potential_donors(?, ?, ?)';
  const values = [bloodType, latitude, longitude];
  console.log(values, '\n')

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.error(results[0]);
      res.status(200).send(results);
    }
  });
});


// USER FEEDBACK STORAGE

app.post('/api/submit-feedback', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Call the insert_user_feedback procedure to insert the data into the user_feedback table
  const query = 'CALL insert_user_feedback(?, ?, ?, ?)';
  const values = [name, email, subject, message];
  db.query(query, values, (err, results, fields) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }

    // Send a success response
    res.status(200).send('Feedback submitted successfully');
    console.log(results)
    console.log(fields)
  });
});


// GET USER FEEBACK DATA (ADMIN DASHBOARD)

app.get('/api/feedback-data', (req, res) => {
  const sql = 'SELECT * FROM feedback';

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});


// MARK FEEDBACK AS READ (ADMIN DASHBOARD)

app.put('/api/mark-feedback-as-read/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // Call the mark_feedback_as_read stored procedure with the specified ID
  db.query('CALL mark_feedback_as_read(?)', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else if (results.affectedRows === 0) {
      // Send a 404 error if the feedback record is not found
      res.status(404).send('Feedback record not found');
    } else {
      // Send a success response with the updated feedback record
      res.status(200).send('Feedback record marked as read');
    }
  });
});



// LOGOUT (FOR EVERY TYPE OF USER)

app.post("/logout", (req, res) => {
  // Invalidate the user's session token, clear session state, etc.
  // ...

  // Send a response to the client indicating that the logout was successful.
  res.status(200).send("Logged out successfully");
});








// START THE SERVER

app.listen(4000, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
