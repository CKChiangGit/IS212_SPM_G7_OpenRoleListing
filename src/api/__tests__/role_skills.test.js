const request = require('supertest');
const baseurl='http://localhost:5005';


test('testing for retreiving role skills', async () => {
    const response = await request(baseurl).get('/role_skills'); 
    expect(response.statusCode).toBe(200);
});

describe('GET /role_skills/:role_id', () => {
    it('responds with staff details for a particular staff', async () => {
      const role_id = 27431; // Replace with the ID of the skill you want to test
      const response = await request(baseurl).get(`/role_skills/${role_id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body[0]).toHaveProperty('skill_id', 6); // Replace with the expected name of the skill
      
    });
  });





