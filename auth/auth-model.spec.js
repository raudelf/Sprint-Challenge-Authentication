const request = require('supertest');
const db = require('../database/dbConfig.js');
const server = require('../api/server.js');

describe('Auth router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('POST /register', () => {
        it('Return 201 OK', () => {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'test', password: 'test'})
                .then(res => {
                    expect(res.status).toBe(201)
                });
        });

        it('Return 500 when missing creds', () => {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'test2'})
                .then(res => {
                    expect(res.status).toBe(500);
                });
        });
    });

    describe('POST /login', () => {
        it('Should return 401 Invalid Creds', () => {
            return request(server)
                .post('/api/auth/login')
                .send({ username: '', password: ''})
                .then(res => {
                    expect(res.status).toBe(401);
                });
        });

        it('Should return 500', () => {
            return request(server)
                .post('/api/auth/login')
                .send({ user: 'username', password: 5})
                .then(res => {
                    expect(res.status).toBe(500);
                });
        });
    });
});