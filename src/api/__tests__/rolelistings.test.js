const request = require('supertest');
const baseurl='http://localhost:3005';
const RoleListings = require('../../../models/role_listings');

test('testing for retreiving role skills', async () => {
    const response = await request(baseurl).get('/rolelistings'); 
    expect(response.statusCode).toBe(200);
}); 

describe('POST /createlistings', () => {
  let createdListingId;

  it('should create a new listing and return 201 status', async () => {
   let staff_id = 2
   let staff_id2 = 8857
    const newListing = {
      role_listing_id: 12, // replace with your test data
      role_id: 11, // replace with your test data
      role_listing_desc: 'Test description', // replace with your test data
      role_listing_source: staff_id2, // replace with your test data
      role_listing_open: "2023-10-09", // replace with your test data
      role_listing_close: "2023-12-12", // replace with your test data
      role_listing_creator: staff_id, // replace with your test data
      role_listing_updater: staff_id // replace with your test data
    };

    const response = await request(baseurl)
      .post('/createlistings')
      .send(newListing);

    createdListingId = response.body.role_listing_id; // Save the ID of the created listing
    
    expect(response.statusCode).toBe(201); 
    expect(response.body).toHaveProperty('role_listing_id');
    expect(response.body).toHaveProperty('role_id');
    // add more assertions as needed
  });
  afterEach(async () => {
    if (createdListingId) {
      // Delete the created listing directly from the database
      await RoleListings.destroy({
        where: {
          role_listing_id: createdListingId
        }
      });
    }
  });

  
});



