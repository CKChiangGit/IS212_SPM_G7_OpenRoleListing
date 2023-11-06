// This microservice is responsible for the sending in of job listings.

// Import the necessary modules and database models to use
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../../models/ConnectionManager');
const RoleApplications = require('../../models/role_applications');
const RoleListings = require('../../models/role_listings');
const StaffDetails = require('../../models/staff_details');
const cors = require('cors');
const app = express();

// Define the port number
const PORT = process.env.PORT || 5002;

// Use the necessary modules
app.use(bodyParser.json());
app.use(cors());


app.get('/staffroleapp/:staff_id', async (req, res) => {
    try {
        const roleApplications = await RoleApplications.findAll({
            where: {
                staff_id: req.params.staff_id
            }
        });
        
        const appIds = roleApplications.map(app => app.role_listing_id);
        const getroleListings = await RoleListings.findAll({
            where: {
                role_listing_id: appIds
            },
            attributes: ['role_id', 'role_listing_desc', 'role_listing_source', 'role_listing_open', 'role_listing_close']
        });      

        const map_list = {
            application_id: roleApplications.map(app => app.role_app_id),
            staff_applied: roleApplications.map(app => app.staff_id),
            role_id: getroleListings.map(roleListing => roleListing.role_id),
            role_listing_desc: getroleListings.map(roleListing => roleListing.role_listing_desc),
            role_listing_source: getroleListings.map(roleListing => roleListing.role_listing_source),
            role_listing_open: getroleListings.map(roleListing => roleListing.role_listing_open),
            role_listing_close: getroleListings.map(roleListing => roleListing.role_listing_close),
            application_status: roleApplications.map(app => app.role_app_status)
        }

        const roleApplicationList = [];
        // Count the number of values in map_list[0][1] and create the same number of objects in roleApplicationList
        for (let i = 0; i < map_list.application_id.length; i++) {
            roleApplicationList[i] = {};
            // For each object in roleApplicationList, assign the key as the key in map_list and the value as the value in map_list[key][i]
            for (const key in map_list) {
                roleApplicationList[i][key] = map_list[key][i];
            }
        }
            

        if (!roleApplications.length) {
            res.status(404).send('<p>There are no role applications.</p>');
        }

        res.status(200).json({
            roleApplicationList
        });

    } catch (error) {
        console.error('Error getting all role applications:', error);
        res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
    }
});

app.get('/hrroleapp/:staff_id', async (req, res) => {
    // Check if staff is hr/manager
    const staff_id = req.params.staff_id;
    const staffDetail = await StaffDetails.findOne({
        where: {
            staff_id
        }
    });
    const staffRole = staffDetail.sys_role
    
    if (staffRole != "hr" && staffRole != "manager") {
        console.log(staffRole);
        res.status(403).json ({message: "You are not authorized to view this page."});
    } else {
        try {
            const roleApplications = await RoleApplications.findAll({
                where: {
                    role_app_status: "applied"
                }
            });
            
            const appIds = roleApplications.map(app => app.role_listing_id);
            const getroleListings = await RoleListings.findAll({
                where: {
                    role_listing_id: appIds
                },
                attributes: ['role_id', 'role_listing_desc', 'role_listing_source', 'role_listing_open', 'role_listing_close']
            });      
    
            const map_list = {
                application_id: roleApplications.map(app => app.role_app_id),
                staff_applied: roleApplications.map(app => app.staff_id),
                role_id: getroleListings.map(roleListing => roleListing.role_id),
                role_listing_desc: getroleListings.map(roleListing => roleListing.role_listing_desc),
                role_listing_source: getroleListings.map(roleListing => roleListing.role_listing_source),
                role_listing_open: getroleListings.map(roleListing => roleListing.role_listing_open),
                role_listing_close: getroleListings.map(roleListing => roleListing.role_listing_close),
                application_status: roleApplications.map(app => app.role_app_status)
            }
    
            const roleApplicationList = [];
            // Count the number of values in map_list[0][1] and create the same number of objects in roleApplicationList
            for (let i = 0; i < map_list.application_id.length; i++) {
                roleApplicationList[i] = {};
                // For each object in roleApplicationList, assign the key as the key in map_list and the value as the value in map_list[key][i]
                for (const key in map_list) {
                    roleApplicationList[i][key] = map_list[key][i];
                }
            }

            if (!roleApplications.length) {
                res.status(404).send('<p>There are no role applications.</p>');
            }

            res.status(200).json({
                roleApplicationList
            });
        }  catch (error) {
            console.error('Error getting all role applications:', error);
            res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
        }
    }
});

// Post a new role application
app.post('/createroleapplications/:staff_id', async (req, res) => {
    try {
        const roleApplyCheck = await RoleApplications.findAll({
            where: {
                staff_id: req.params.staff_id
            }
        });
        if (roleApplyCheck.role_app_status == "applied") {
            res.status(403).json({message: "You have already applied for this role."});
        }
        
        const { role_app_id, role_listing_id, staff_id, role_app_status } = req.body;
        const roleApplication = await RoleApplications.create({
        role_app_id,
        role_listing_id,
        staff_id,
        role_app_status
        });
            

        res.status(201).json(roleApplication);
    } catch (error) {
        console.error('Error creating a new role application:', error);
        res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
    }
});


// Update a role application
app.put('/updateroleapplications/:role_app_id', async (req, res) => {
    try {
        const { role_app_status } = req.body;
        const roleApplication = await RoleApplications.update({
            role_app_status
        }, {
            where: {
                role_app_id: req.params.role_app_id
            }
        });

        res.status(200).json(roleApplication);
    } catch (error) {
        console.error('Error updating a role application:', error);
        res.status(500).send(`<p>There is an internal error, please contact the IT Department Team.</p>`);
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