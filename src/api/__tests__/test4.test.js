const request = require('supertest');
const baseurl='http://localhost:3004';



describe('GET /roledetails/:role_id', () => {
    it('responds with skill details for the specified skill ID', async () => {
      const roleid = 16877; // Replace with the ID of the skill you want to test
      const response = await request(baseurl).get(`/roledetails/${roleid}`);
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/); // Check that the response is a JSON string
      expect(response.body).toHaveProperty('role_name', 'Talent Recruiter, HR'); // Replace with the expected name of the skill
      expect(response.body).toHaveProperty('role_description', "The Talent Recruiter is responsible for attracting, sourcing, evaluating, and hiring top talent for the organization.  They construct a talented and motivated workforce by employing effective recruitment strategies and ensuring a positive candidate experience throughout the hiring process.\n\nThe Talent Recruiter key responsibilities include:\n1. Interview Coordination\n2. Employer Branding and Recruitment Marketing\n3. Recruitment Metrics and Reporting\n\nQualifications and Skills include:\n- Bachelor's degree in Human Resources, Business Administration, or related field.\n- Familiarity with recruitment methods and tools, including applicant tracking systems (ATS) and social media platforms.\n- Understanding of employment laws and regulations related to recruitment."); // Replace with the expected description of the skill
      expect(response.body).toHaveProperty('role_status', 'active'); 
    });
  });