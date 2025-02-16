import express from 'express';
import { getBooks, getBook, createBook } from '../controllers/book.controller';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', createBook);

export default router;