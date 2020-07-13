const supertest = require('supertest');

const app = require('../app');

describe('get /api/v1', () => {
    it('should an array of item types', async () => {
        const response = await supertest(app)
        .get('/api/v1')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.message).toEqual('🌍 Hello World 🌍');
    });
});
