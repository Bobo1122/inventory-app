const supertest = require('supertest');

const app = require('../../app');

describe('get /v1/users', () => {
    it('should return array of users', async () => {
        const response = await supertest(app)
        .get('/api/v1/users')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    });
});