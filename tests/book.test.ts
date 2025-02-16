import request from 'supertest';
import app from '../src/app';
import { Book } from '../src/models/book.model';

describe('Book API', () => {
    beforeEach(async () => {
        await Book.destroy({ where: {} });
    });

    it('should create a new book', async () => {
        const response = await request(app)
            .post('/books')
            .send({ name: 'Test Book' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Test Book');
    });

    it('should get a book by ID', async () => {
        const book = await Book.create({ name: 'Test Book' });

        const response = await request(app)
            .get(`/books/${book.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(book.id);
        expect(response.body.name).toBe('Test Book');
    });

    it('should return 404 for a non-existent book', async () => {
        const response = await request(app)
            .get('/books/999');

        expect(response.status).toBe(404);
    });
});