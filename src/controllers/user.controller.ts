import { Request, Response } from 'express';
import { User } from '../models/user.model'; // Use named import
import Borrowing from '../models/borrowing.model'; // Use named import
import { Book } from '../models/book.model'; // Use named import
import { Op } from 'sequelize';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Borrowing,
                    include: [Book],
                    where: { returned_at: { [Op.not]: null } },
                    required: false,
                    as: 'pastBorrowings',
                },
                {
                    model: Borrowing,
                    include: [Book],
                    where: { returned_at: null },
                    required: false,
                    as: 'presentBorrowings',
                },
            ],
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const pastBooks = user.pastBorrowings?.map(b => ({
            name: b.book?.name || 'Unknown Book',
            userScore: b.score,
        })) || [];

        const presentBooks = user.presentBorrowings?.map(b => ({
            name: b.book?.name || 'Unknown Book',
        })) || [];

        res.json({
            id: user.id,
            name: user.name,
            books: {
                past: pastBooks,
                present: presentBooks,
            },
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const user = await User.create({ name });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};