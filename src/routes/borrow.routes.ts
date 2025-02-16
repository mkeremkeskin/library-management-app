import express from 'express';
import { borrowBook, returnBook } from '../controllers/borrow.controller';

const router = express.Router();

router.post('/users/:userId/borrow/:bookId', borrowBook);
router.post('/users/:userId/return/:bookId', returnBook);

export default router;