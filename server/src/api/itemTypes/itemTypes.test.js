const supertest = require('supertest');

const app = require('../../app');

describe('get /v1/types', () => {
    it('should an array of item types', async () => {
        const response = await supertest(app)
        .get('/api/v1/types')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toEqual([]);
    });
});
