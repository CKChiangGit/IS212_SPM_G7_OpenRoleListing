// -- Code from Persis --
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 

// Import the Sequelize instance from ConnectionManager
const sequelize = require('../../models/ConnectionManager'); 

// Import the Sequelize model for RoleApplications
const RoleListings = require('../../models/role_listings'); 

const app = express();
const PORT = process.env.PORT || 5004;
app.use(cors())
app.use(bodyParser.json());

//viewing role listings as staff
app.get('/role_listings', async (req, res) => {
    try {
      const role_listings = await RoleListings.findAll(); 
      res.json(role_listings);
    } catch (error) {
      res.status(500).json({ error: `Internal server error in '/role_listings' endpoint` });
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