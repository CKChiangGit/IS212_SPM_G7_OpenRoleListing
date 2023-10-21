// Complex microservice to handle the open roles available in the system

// Import the necessary modules and database models to use
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Define the port number
const PORT = process.env.PORT || 3001;

// Use the necessary modules
app.use(bodyParser.json());
app.use(cors());

// Filter out the open roles available
app.get('/openroles', async (req, res) => {
  try {
    // Ensure that applyroles.js returns a response
    // const response = await axios.get('http://localhost:3000/applyroles');
    const roleListings = await axios.get('http://localhost:3005/rolelistings');

    // Filter out the open roles available
    const currentDate = new Date();
    const openRoles = roleListings.data.filter(listing => new Date(listing.role_listing_close) > currentDate);

    if (openRoles.length > 0) {
        res.status(200).json(openRoles);
    } else {
        res.status(404).send('<p>There are no open roles.</p>');
    }

  } catch (error) {
    res.status(500).send(`<p>There is an internal error to display all open listings, please contact the IT Department Team.</p>`);
  }
});

// To reach the role details endpoint
app.get('/openroles/:role_id', async (req, res) => {
  try {
    const roleDetails = await axios.get(`http://localhost:3004/roledetails/${req.params.role_id}`);
    res.status(200).json(roleDetails.data);
  } catch (error) {
    res.status(500).send(`<p>There is an internal error reaching out to role details, please contact the IT Department Team.</p>`);
  }
});


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
    console.error('Error starting the server:', error);
});
