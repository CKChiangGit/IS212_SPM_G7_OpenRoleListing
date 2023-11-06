const request = require('supertest');
const baseurl='http://localhost:3007';



test('testing for retreiving staff skills', async () => {
    const response = await request(baseurl).get('/staff_skills'); 
    expect(response.statusCode).toBe(200);
});

describe('GET /staff_skills/:staff_id', () => {
    it('responds with staff skills for a particular staff', async () => {
      const staff_id = 8857; // Replace with the ID of the skill you want to test
      const response = await request(baseurl).get(`/staff_skills/${staff_id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
          expect.objectContaining({
        staff_id: "8857",
        skill_ids: [26, 30],
        skill_names: ["Public Relations", "Organizational Behavior"]
          })
        ); // Replace with the expected name of the skill
      
    });
  });




