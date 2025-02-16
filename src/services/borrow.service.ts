import Borrowing from '../models/borrowing.model'; // Use default import

export const borrowBook = async (userId: number, bookId: number) => {
    return await Borrowing.create({ 
        user_id: userId,
        book_id: bookId,
        borrowed_at: new Date(), // Add required field
    });
};

export const returnBook = async (userId: number, bookId: number, score: number) => {
    const borrowing = await Borrowing.findOne({ where: { user_id: userId, book_id: bookId, returned_at: null } });
    if (!borrowing) throw new Error('Borrowing record not found');

    borrowing.returned_at = new Date();
    borrowing.score = score;
    await borrowing.save();
};