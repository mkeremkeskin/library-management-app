import { body, validationResult } from 'express-validator';

export const validateUser = [
    body('name').isString().notEmpty(),
];

export const validateReturnBook = [
    body('score').isInt({ min: 1, max: 10 }),
];