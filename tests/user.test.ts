import request from 'supertest';
import app from '../src/app';
import { User } from '../src/models/user.model';

describe('User API', () => {
    beforeEach(async () => {
        await User.destroy({ where: {} });
    });

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'Test User' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Test User');
    });

    it('should get a user by ID', async () => {
        const user = await User.create({ name: 'Test User' });

        const response = await request(app)
            .get(`/users/${user.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(user.id);
        expect(response.body.name).toBe('Test User');
    });

    it('should return 404 for a non-existent user', async () => {
        const response = await request(app)
            .get('/users/999');

        expect(response.status).toBe(404);
    });
});