/*const app = require('../../app');
const request = require('supertest');

describe('searching for roles', () => {
    it('returns status code 200 if oepn roles list appears', async()=>{
        const response = await request(app).get('/openroles');

        expect(response.statusCode).toBe(200);
    });
});*/

/*const app=require('../rolelistings');
const request = require('supertest'); 
describe('searching for roles', () => {
    it('returns status code 200 if oepn roles list appears', async()=>{
        const response = await request(app).get('/roledetails');

        expect(response.statusCode).toBe(200);
    });
}); */

const request = require('supertest');
const baseurl='http://localhost:3005';
test('testing for retreiving rolelistings', async () => {
    const response = await request(baseurl).get('/rolelistings');
    expect(response.statusCode).toBe(200);
});