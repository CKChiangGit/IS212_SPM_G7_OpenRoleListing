const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../models/ConnectionManager');
const RoleListings = require('../models/role_listings');
const cors = require('cors');

// Import the Sequelize instance from ConnectionManager


// Import the Sequelize model for Role Listings


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Get all role listings details
app.get('/rolelistings', async (req, res) => {
  try {
    const rolelistings = await RoleListings.findAll();
    res.json(rolelistings);
  } catch (error) {
    console.error('Error getting all role listings:', error);
    res.status(500).send('<p>There is an internal error, please contact the IT Department Team.</p>');
  }
});

// Post a new role listing
app.post('/rolelistings', async (req, res) => {
  try {
    const rolelisting = await RoleListings.create(req.body);
    res.json(rolelisting);
  } catch (error) {
    console.error('Error creating a new role listing:', error);
    res.status(501).send(`<p>There is an error posting a new role listing, please contact the IT Department Team.</p>`);
  }
});


app.listen(PORT, async () => {
  try {
    // Sync the model with the database
    await sequelize.sync({ force: false });
    console.log('Model synchronized with the database.');

    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error syncing the model:', error);
  }
});