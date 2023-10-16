// Create a express microservice that retrieve role details from role_details model
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../models/ConnectionManager');
const RoleDetails = require('../models/role_details');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(cors());


app.get('/roledetails/:role_id', async (req, res) => {
  try {
    const roledetails = await RoleDetails.findOne({
      where: {
        role_id: req.params.role_id
      }
    });
    if (!roledetails) {
      res.status(404).send('<p>There is no such role.</p>');
    } else {
      res.status(200).json({
        role_name: roledetails.role_name,
        role_description: roledetails.role_description,
        role_status: roledetails.role_status
      });
    }
  } catch (error) {
    console.error('Error getting role details:', error);
    res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
  }
});


app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Model synchronized with the database.');

    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Error syncing the model:', error);
  }
});