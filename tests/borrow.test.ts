import request from 'supertest';
import app from '../src/app';
import { User, Book, Borrowing } from '../src/models';

describe('Borrow Book API', () => {
    let user: User;
    let book: Book;

    beforeEach(async () => {
        await Borrowing.destroy({ where: {} });
        await User.destroy({ where: {} });
        await Book.destroy({ where: {} });

        user = await User.create({ name: 'Test User' });
        book = await Book.create({ name: 'Test Book' });
    });

    it('should allow a user to borrow a book', async () => {
        const response = await request(app)
            .post(`/users/${user.id}/borrow/${book.id}`);

        expect(response.status).toBe(204);

        const borrowing = await Borrowing.findOne({
            where: { user_id: user.id, book_id: book.id, returned_at: null },
        });
        expect(borrowing).not.toBeNull();
    });

    it('should return 404 if user or book does not exist', async () => {
        const response = await request(app)
            .post('/users/999/borrow/999');

        expect(response.status).toBe(404);
    });

    it('should return 400 if the book is already borrowed', async () => {
        await Borrowing.create({ user_id: user.id, book_id: book.id });

        const response = await request(app)
            .post(`/users/${user.id}/borrow/${book.id}`);

        expect(response.status).toBe(400);
    });
});