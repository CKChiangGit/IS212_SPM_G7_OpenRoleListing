// // // Import the Sequelize instance from ConnectionManager
// // const sequelize = require('../../../models/ConnectionManager'); 


// const request = require('supertest');
// const RoleApplications = require('../../../models/role_applications');

// const baseurl = 'http://localhost:5002'; // Remove '/role_applications_staff' from the base URL

// // beforeAll(async () => {
// //     // Perform any necessary setup or database synchronization
// //     // For example, syncing your database before running the tests
// //     await sequelize.sync({ force: true }); // Sync the model with the database
// //     console.log('Database and models synchronized.');
// //   });
  
//   afterAll(async () => {
//     // Perform cleanup or disconnect from the database
//     // For example, cleaning up or disconnecting from the database after the tests
//     await sequelize.close(); // Disconnect from the database
//     console.log('Disconnected from the database.');
//    });

// test('testing applying for a role listing', async () => {
//   const mockData = {
//     staff_id: 99,
//     role_listing_id: 531,
//   };

//   const response = await request(baseurl)
//     .post('/role_applications_staff') // Send a POST request to apply for a role listing
//     .send(mockData);

//   expect(response.statusCode).toBe(201); // Expect a 201 (Created) status code
//   console.log("Created Dummy Data for Role Application.")
//   // Add more assertions to validate the response as needed
//     deleteRoleApplication(mockData); // Cleanup the created data
//   // Call the data cleanup function to delete the created data
//   async function deleteRoleApplication(applicationData) {
//     try {
//       // Use the RoleApplications model to delete the record based on the provided data
//       await RoleApplications.destroy({
//         where: {
//           staff_id: applicationData.staff_id,
//           role_listing_id: applicationData.role_listing_id,
//         },
//       });
//       console.log("Dummy data is deleted from Role Applcation Table.")
//     } catch (error) {
//       console.error('Error deleting role application:', error);
//     }
//   } // Replace with the actual cleanup function

//   // You can also add additional assertions to verify the data is deleted
// });




const request = require('supertest');
const RoleApplications = require('../../../models/role_applications');

const baseurl = 'http://localhost:5002'; // Remove '/role_applications_staff' from the base URL

test('testing applying for a role listing', async () => {
  const mockData = {
    staff_id: 1,
    role_listing_id: 531,
  };

  const response = await request(baseurl)
    .post('/role_applications_staff') // Send a POST request to apply for a role listing
    .send(mockData);

  expect(response.statusCode).toBe(201); // Expect a 201 (Created) status code
  // Add more assertions to validate the response as needed
     deleteRoleApplication(mockData); // Cleanup the created data
  // Call the data cleanup function to delete the created data
  async function deleteRoleApplication(applicationData) {
    try {
      // Use the RoleApplications model to delete the record based on the provided data
      await RoleApplications.destroy({
        where: {
          staff_id: applicationData.staff_id,
          role_listing_id: applicationData.role_listing_id,
        },
      });
    } catch (error) {
      console.error('Error deleting role application:', error);
    }
  } // Replace with the actual cleanup function

  // You can also add additional assertions to verify the data is deleted
});