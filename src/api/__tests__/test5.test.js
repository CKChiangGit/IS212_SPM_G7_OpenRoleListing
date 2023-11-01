const request = require('supertest');
const baseurl='http://localhost:5003';

test('retrieving role details', async () => {
    const response = await request(baseurl).get('/roledetails');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
});