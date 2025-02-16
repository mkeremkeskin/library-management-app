import app from './app';
import { sequelize } from './config/config';
import { Book, Borrowing, User } from './models/associations'; // Import models and associations

const PORT = process.env.PORT || 3000;

// Sync database and start server
sequelize.sync({ force: false }) // Set `force: true` to drop and recreate tables (use with caution)
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });