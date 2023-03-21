const request = require('supertest');
const app = require('../app');

describe('users', () => {
    var token = "";
    var id = "";

    it('register a user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ "name": "Dummy", "age": 25, "email": "dummy@test.com", "password": "ImADummy" })
            .set('Accept', 'application/json')
            .expect(200);
        expect(response.body.user.name).toEqual('Dummy');
        expect(response.body.user.email).toEqual('dummy@test.com');
        expect(response.body.user.role).toEqual('user');

        token = response.body.token;
        id = response.body.user._id;
    });

    it('get all users', async () => {
        const response = await request(app)
            .get('/api/users')
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200);
        expect(response.body.pop().name).toEqual('Dummy');
    });

    it('delete a user', async () => {
        const response = await request(app)
            .delete('/api/users/' + id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200);
        expect(response.body.acknowledged).toEqual(true);
    });
});