const express = require('express');
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json())

// const port = 5000
app.get("/role_details", (req, res) => {
    // res.json({ message: "Hello from server!" })
    res.json({ "users": ["Hello", "from", "server!"] })
})

// app.listen(port, () => {console.log(`Server started on port ${port}`)})


const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

// Import the Sequelize instance from ConnectionManager
const sequelize = require('./models/ConnectionManager');

// Import the Sequelize model for RoleDetails
const RoleDetails = require('./models/role_details');

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