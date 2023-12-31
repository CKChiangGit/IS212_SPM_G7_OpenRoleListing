// From Persis for Staff Details MS:
const request = require('supertest');
const StaffDetails = require('../../../models/staff_details');
const StaffSkills = require('../../../models/staff_skills');
const baseurl='http://localhost:5007';
  
let createdListingId;
test('testing for posting staff creation', async () => {
      const response = await request(baseurl).post('/staff_creation').send({
          staff_id: 123123,
          fname:"test",
          lname:"tests",
          dept:"dept",
          email:"test@gmail.com",
          phone:"12345678",
          biz_address:"80 Stamford Rd, Singapore 178902", 
          sys_role:"staff",
          pw:"123123",
          skill_id: ["6" , "10"]
      }) 
      createdListingId = response.body[0].staff_id;
      console.log(createdListingId) // Save the ID of the created listing
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.statusCode).toBe(200);
  });
  afterEach(async () => {
      if (createdListingId) {
        // Delete the created listing directly from the database
        await StaffSkills.destroy({
          where: {
            staff_id: createdListingId
          }
        });
        await StaffDetails.destroy({
          where: {
            staff_id: createdListingId
          }
        });
      }
    });


test('retrieving all staff details', async () => {
    const response = await request(baseurl).get('/staff_details');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);

});


describe('GET /staff_details/:staff_id', () => {
    it('responds with staff details for a particular staff', async () => {
      const staff_id = '1'; // Replace with the ID of the skill you want to test
      const response = await request(baseurl).get(`/staff_details/${staff_id}`);
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/); // Check that the response is a JSON string
      expect(response.body.data.staff_details[0]).toHaveProperty('staff_id', 1); // Replace with the expected name of the skill
      expect(response.body.data.staff_details[0]).toHaveProperty('fname', "JOHN"); // Replace with the expected description of the skill
      expect(response.body.data.staff_details[0]).toHaveProperty('lname', 'SIM');
      expect(response.body.data.staff_details[0]).toHaveProperty('dept', 'MANAGEMENT');
      expect(response.body.data.staff_details[0]).toHaveProperty('email', 'john.sim.1@all-in-one.com.sg');
      expect(response.body.data.staff_details[0]).toHaveProperty('phone', '87821918');
      expect(response.body.data.staff_details[0]).toHaveProperty('biz_address', '65 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409065');
      expect(response.body.data.staff_details[0]).toHaveProperty('sys_role', 'inactive');
      expect(response.body.data.staff_details[0]).toHaveProperty('pw', '123123');
    });
  });

  describe('POST /staff_details', () => {
    it('should create a new application and return 201 status', async () => {
      const query = {
        email: 'anna.sng.8857@all-in-one.com.sg',
        password: '123123'
      };
      const response = await request(baseurl)
        .post('/staff_details')
        .send(query);
      expect(response.statusCode).toBe(200); 
      expect(response.body).toHaveProperty('data');
      // add more assertions as needed
    });
  });