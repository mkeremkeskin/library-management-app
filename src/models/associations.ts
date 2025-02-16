import Borrowing from './borrowing.model'; // Default import
import { Book } from './book.model'; // Named import
import { User } from './user.model'; // Named import

// Define associations between models

// Book and Borrowing
Book.hasMany(Borrowing, {
  foreignKey: 'book_id',
  as: 'borrowings', // Alias for the association
});

Borrowing.belongsTo(Book, {
  foreignKey: 'book_id',
  as: 'book', // Alias for the association
});

// User and Borrowing
User.hasMany(Borrowing, {
  foreignKey: 'user_id',
  as: 'pastBorrowings', // Alias for past borrowings (returned books)
});

User.hasMany(Borrowing, {
  foreignKey: 'user_id',
  as: 'presentBorrowings', // Alias for present borrowings (not yet returned)
});

Borrowing.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user', // Alias for the association
});

// Export all models (optional)
export { Book, Borrowing, User };