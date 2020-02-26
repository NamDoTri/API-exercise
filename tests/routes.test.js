const request = require('supertest');
const app = require('../index');
describe('Our server', function() {
    it('should send back a JSON object with goodCall set to true', function() {
        request(app)
            .get('/index')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expectSta
    });

});