const request = require('supertest');
const RoleApplications = require('../../../models/role_applications');

const baseurl = 'http://localhost:5002'; // Remove '/role_applications_staff' from the base URL

test('testing for retrieving role applications for staff', async () => {
    const staff_id = 3498
    const response = await request(baseurl).get(`/staffroleapp/${staff_id}`);
    expect(response.statusCode).toBe(200);
});

test('testing for retrieving role applications for hr', async () => {
  const staff_id = 2
  const response = await request(baseurl).get(`/hrroleapp/${staff_id}`);
  expect(response.statusCode).toBe(200);
});


describe('POST /roleapplications', () => {
    let createdListingId;
    const staff_id = 12500;
    it('should create a new application and return 201 status', async () => {
      const roleapp = {
        application_id: 1,
        role_listing_id: 531,
        staff_id : staff_id,
        role_app_status: 'applied',
      };
  
      const response = await request(baseurl)
        .post(`/createroleapplications/${staff_id}`)
        .send(roleapp);
  
      createdListingId = response.body.staff_id; // Save the ID of the created listing
      console.log(createdListingId)
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

it('update the status of the specified role application to the specified newStatus', async () => {
  // Arrange
  const role_app_id = 102; 
  const role_app_status = 'accepted';

  // Act
  const response = await request(baseurl)
  .put(`/updateroleapplications/${role_app_id}`)
    .send({ role_app_status });
  // Assert
  expect(response.status).toBe(200);
});
