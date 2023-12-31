// Complex microservice to handle the open roles available in the system

// Import the necessary modules and database models to use
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Define the port number
const PORT = process.env.PORT || 3003;

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
        res.status(404).json({ message: 'There are no open roles available at this time.' });
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

// Creation of new role
// Receive data from frontend
app.post('/createrole', bodyParser.urlencoded({ extended: true }), async (req, res) => {
  try {
    // Prepare the data in JSON format
    const role = {
      role_id: req.body.role_id,
      role_name: req.body.role_name,
      role_description: req.body.role_description,
      role_status: req.body.role_status,
    };
    
    const listing = {
      role_listing_id: req.body.role_listing_id,
      role_id: req.body.role_id,
      role_listing_desc: req.body.role_name,
      role_listing_source: req.body.role_listing_source,
      role_listing_open: req.body.role_listing_open,
      role_listing_close: req.body.role_listing_close,
      role_listing_creator: req.body.role_listing_creator,
      role_listing_updater: req.body.role_listing_updater
    };
    // console.log("role details", role)
    // console.log("listing details", listing)
    // res.status(200).json(['hi'])
    // // Send data as JSON to the 'createrole' endpoint
    const newRole = await axios.post('http://localhost:3004/createrole', JSON.stringify(role), {
      headers: {
        'Content-Type': 'application/json' // Set the content type as JSON
      }
    });

    // Send data as JSON to the 'createlistings' endpoint
    const newListing = await axios.post('http://localhost:3005/createlistings', JSON.stringify(listing), {
      headers: {
        'Content-Type': 'application/json' // Set the content type as JSON
      }
    });

    // res.status(200).json(newRole.data); // Respond with the data received
    res.status(200).json(newListing.data); // Respond with the data received
  } catch (error) {
    res.status(500).send(`<p>There is an internal error creating a new role, please contact the IT Department Team.</p>`);
  }
});


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
    console.error('Error starting the server:', error);
});