
const request = require('supertest');
const RoleApplications = require('../../../models/role_applications');

const baseurl = 'http://localhost:5002'; // Remove '/role_applications_staff' from the base URL

test('testing for retreiving role applications', async () => {
    const response = await request(baseurl).get('/role_applications_ids'); 
    expect(response.statusCode).toBe(200);
});



/*test('testing applying for a role listing', async () => {
  const mockData = {
    staff_id: 1,
    role_listing_id: 531,
  };

  const response = await request(baseurl)
    .post('/role_applications_staff') // Send a POST request to apply for a role listing
    .send(mockData);

  expect(response.statusCode).toBe(201); // Expect a 201 (Created) status code

  // Add more assertions to validate the response as needed

  // Call the data cleanup function to delete the created data
  await deleteRoleApplication(mockData);

  // You can also add additional assertions to verify the data is deleted
});

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
    // Log the error using a logger instead of the global console object
    log.error('Error deleting role application:', error);
  }
}*/

describe('POST /roleapplications', () => {
    let createdListingId;
  
    it('should create a new application and return 201 status', async () => {
      const roleapp = {
        staff_id: 1,
    role_listing_id: 531,
      };
  
      const response = await request(baseurl)
        .post('/role_applications_staff')
        .send(roleapp);
  
      createdListingId = response.body.staff_id; // Save the ID of the created listing
      
      expect(response.statusCode).toBe(201); 
      expect(response.body).toHaveProperty('role_listing_id');
      // add more assertions as needed
    });
    afterEach(async () => {
      if (createdListingId) {
        // Delete the created listing directly from the database
        await RoleApplications.destroy({
          where: {
            staff_id: createdListingId
          }
        });
      }
    });
  
  });

it('should update the status of the specified role application to the specified newStatus', async () => {
  // Arrange
  const role_app_id = 104; 
  const newStatus = 'rejected';

  // Act
  const response = await request(baseurl)
  .put(`/role_applications/${role_app_id}`)
    .send({ newStatus });

  // Assert
  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    role_app_id,
    staff_id: expect.any(Number),
    role_listing_id: expect.any(Number),
    role_app_status: newStatus,
    role_app_ts_create: expect.any(String),
  });
});