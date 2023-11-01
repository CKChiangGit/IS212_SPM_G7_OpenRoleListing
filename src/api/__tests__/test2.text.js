const request = require('supertest');
const baseurl='http://localhost:5007';

test('testing for posting staff creation', async () => {
    const response = await request(baseurl).post('/staff_creation').send({
        staff_id:"staff_id",
        fname:"fname",
        lname:"lname",
        dept:"dept",
        email:"email",
        phone:"phone",
        biz_address:"biz_address",
        sys_role:"sys_role",
        pw:"pw"
    }) 
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
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