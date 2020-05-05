const server = require('./server.js');
const request = require('supertest');

describe('Server is running properly', () => {
    it('Has DB_ENV set to "testing"', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', () => {
        it('Returns a 200 OK', () => {
            return request(server).get('/')
                .expect(200);
        });

        it('Returns json content', () => {
            return request(server).get('/')
                .expect('Content-Type', /json/);
        });

        it('Returns "running" from object', () => {
            return request(server).get('/')
                .then(res => {
                    expect(res.body.api).toBe('running');
                });
        });
    });
});