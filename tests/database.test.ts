import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/config/config';

describe('Database Connection Errors', () => {
    beforeAll(async () => {
        // Simulate a database connection error
        await sequelize.close();
    });

    it('should return 500 if the database is unavailable', async () => {
        const response = await request(app)
            .get('/users');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Internal Server Error');
    });
});