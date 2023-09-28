const express = require('express');
const bodyParser = require('body-parser');

// Import the Sequelize instance from ConnectionManager
const sequelize = require('./models/ConnectionManager');

// Import the Sequelize model for RoleDetails
const RoleDetails = require('./models/role_details');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Adding new role details
app.post('/role_details', async (req, res) => {
  try {
    const role_details = await RoleDetails.create(req.body);
    res.json(role_details);
  } catch (error) {
    res.status(500).json({ error: `Internal server error in '/role_details' endpoint` });
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