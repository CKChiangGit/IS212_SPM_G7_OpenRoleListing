const sequelize = require('../../models/ConnectionManager'); // Set up your Sequelize connection
const StaffRoles = require('../../models/staff_roles'); // Import the StaffRoles model

// --Microservice Portion--
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5008;
app.use(cors())
app.use(bodyParser.json());  


app.get('/staff_roles', async (req, res) => {
  try {
    const staff_roles = await StaffRoles.findAll(); // test

    if (staff_roles.length) {
      return res.status(200).json({
        code: 200,
        data: {
          'staff_roles': staff_roles.map(staff_roles => staff_roles.toJSON()),
        },
      });
    }

    return res.status(404).json({
      code: 404,
      message: 'There are no available staff roles.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

// -- staff_id query seems to be redundant, comment out for now --
// app.get('/staff_roles/:staff_id', async (req, res) => {
//   const staff_id = req.params.staff_id;
//   try {
//     const staff_roles = await StaffRoles.findAll({where: {staff_id}});
//     if (staff_roles) {
//       return res.status(200).json({
//         code: 200,
//         data: {
//           'staff_roles': staff_roles.map(staff_roles => staff_roles.toJSON()),
//         },
//       });
//     }

//     return res.status(404).json({
//       code: 404,
//       message: 'There are no available staff roles / Staff does not exist.',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       code: 500,
//       message: 'Internal Server Error',
//     });
//   }
// });

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