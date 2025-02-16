import { Request, Response } from 'express';
import { User } from '../models/user.model'; // Use named import
import { Book } from '../models/book.model'; // Use named import
import Borrowing from '../models/borrowing.model'; // Keep as default import

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
    const { userId, bookId } = req.params;

    try {
        const user = await User.findByPk(Number(userId)); // Convert to number
        const book = await Book.findByPk(Number(bookId)); // Convert to number

        if (!user || !book) {
            res.status(404).json({ error: 'User or Book not found' });
            return;
        }

        const existingBorrowing = await Borrowing.findOne({
            where: { book_id: Number(bookId), returned_at: null }, // Convert to number
        });

        if (existingBorrowing) {
            res.status(400).json({ error: 'Book is already borrowed' });
            return;
        }

        await Borrowing.create({ 
            user_id: Number(userId), // Convert to number
            book_id: Number(bookId), // Convert to number
            borrowed_at: new Date(), // Add required field
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error borrowing book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const returnBook = async (req: Request, res: Response): Promise<void> => {
    const { userId, bookId } = req.params;
    const { score } = req.body;

    try {
        const borrowing = await Borrowing.findOne({
            where: { user_id: userId, book_id: bookId, returned_at: null },
        });

        if (!borrowing) {
            res.status(404).json({ error: 'Borrowing record not found' });
            return;
        }

        borrowing.returned_at = new Date();
        borrowing.score = score;
        await borrowing.save();

        res.status(204).send();
    } catch (error) {
        console.error('Error returning book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};