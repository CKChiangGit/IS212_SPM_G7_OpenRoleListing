const request = require('supertest');
const baseurl='http://localhost:5006';

test('retrieving skill details', async () => {
    const response = await request(baseurl).get('/skill_details');
    expect(response.statusCode).toBe(200);
});


describe('GET /skill_details/:skill_id', () => {
    it('responds with skill details for the specified skill ID', async () => {
      const skillId = 6; // Replace with the ID of the skill you want to test
      const response = await request(baseurl).get(`/skill_details/${skillId}`);
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/); // Check that the response is a JSON string
      expect(response[1]).toHaveProperty('skill_name', 'Management Communication'); // Replace with the expected name of the skill
      expect(response[2]).toHaveProperty('skill_status', 'active'); // Replace with the expected description of the skill
    });
  }); 