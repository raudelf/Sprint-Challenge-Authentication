const db = require('../database/dbConfig.js');
const server = require('../api/server.js');
const request = require('supertest');

describe('Jokes Router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('GET /', () => {
        it('Should return 401 for creds missing', () => {
            return request(server)
                .get('/api/jokes')
                .then(res => {
                    expect(res.status).toBe(401);
                });
        });

        it('Returns json content', () => {
            return request(server).get('/api/jokes')
                .expect('Content-Type', /json/);
        });
    });
});