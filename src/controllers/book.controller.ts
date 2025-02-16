import { Request, Response } from 'express';
import { Book } from '../models/book.model'; // Named import
import Borrowing from '../models/borrowing.model'; // Default import
import { Op } from 'sequelize';

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const books = await Book.findAll();
    res.json(books);
};

export const getBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findByPk(req.params.id, {
            include: [
                {
                    model: Borrowing,
                    where: { returned_at: { [Op.not]: null } },
                    required: false,
                    as: 'borrowings',
                },
            ],
        });

        if (!book) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }

        const scores = book.borrowings?.map((b: Borrowing) => b.score).filter((score: number | null) => score !== null) || [];
        const averageScore = scores.length > 0 ? (scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : -1;

        res.json({
            id: book.id,
            name: book.name,
            score: averageScore.toFixed(2),
        });
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.create({ name: req.body.name });
        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};