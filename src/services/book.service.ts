import { Book } from '../models/book.model';

export const getBookById = async (id: number) => {
    return await Book.findByPk(id);
};

export const createBook = async (name: string) => {
    return await Book.create({ name });
};