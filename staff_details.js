const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import the Sequelize instance from ConnectionManager
const sequelize = require('./models/ConnectionManager');

// Import the Sequelize model for StaffDetails
const StaffDetails = require('./models/staff_details');

const app = express();
const PORT = process.env.PORT || 6001;
app.use(cors())
app.use(bodyParser.json());

// app.get("/staff_details", (req, res) => {
//   res.json({ message: "Hello from server!" })
// })   
app.get('/staff_creation', async (req, res) => {
    res.json({ message: "Hello from server!" })
});

// return new role details that match email and password
app.post('/staff_details', async (req, res) => {
    try {
        const staff_details = await StaffDetails.findAll({
        where: {
            email: req.body.email,
            pw: req.body.password
        }
        });
        res.json(staff_details);
    } catch (error) {
        res.status(500).json({ error: `Internal server error in '/staff_details' endpoint` });
    }
});

// create new role details
app.post('/staff_creation', async (req, res) => {
    try {
        const staff_creation = await StaffDetails.create(req.body);
        // const staff_creation = await StaffDetails.create({
        // staff_id: req.body.staff_id,
        // fname: req.body.fname,
        // lname: req.body.lname,
        // dept: req.body.dept,
        // email: req.body.email,
        // phone: req.body.phone,
        // biz_address: req.body.biz_address,
        // sys_role: req.body.sys_role,
        // pw: req.body.password
        // });
        res.json(staff_creation);
    } catch (error) {
        res.status(500).json({ error: `Internal server error in '/staff_details' endpoint` });
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