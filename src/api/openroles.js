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
app.use(cors())
app.use(bodyParser.json()); 

// Filter out the open roles available
app.get('/openroles', async (req, res) => {
  try {
    // Ensure that applyroles.js returns a response
    // const response = await axios.get('http://localhost:3000/applyroles');
    const roleListings = await axios.get('http://localhost:3005/rolelistings');
    const openRoles = roleListings.data

    // // Filter out the open roles available
    // const currentDate = new Date();
    // const openRoles = roleListings.data.filter(listing => new Date(listing.role_listing_close) > currentDate);
  
    if (openRoles.length > 0) {
        res.status(200).json(openRoles);
    } else {
        res.status(404).send('<p>There are no open roles.</p>');
    }

  } catch (error) {
    // include error in response
    // res.status(500).send(`<p>There is an internal error to display all open listings, please contact the IT Department Team.</p>`);
    res.status(500).send(`<p>There is an internal error to display all open listings, please contact the IT Department Team.</p>` + error);
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
    // View the data received from the frontend
    console.log(req.body);
    // Prepare the data in JSON format
    const jsonData = {
      role_id: req.body.role_id,
      role_name: req.body.role_name,
      role_description: req.body.role_desc,
      role_status: req.body.role_status
    };
    // Print the data to the console
    console.log(jsonData);

    // Send data as JSON to the 'createrole' endpoint
    const newRole = await axios.post('http://localhost:3004/createrole', JSON.stringify(jsonData), {
      headers: {
        'Content-Type': 'application/json' // Set the content type as JSON
      }
    });

    res.status(200).json(newRole.data); // Respond with the data received
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
