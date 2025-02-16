import express from 'express';
import userRoutes from './routes/user.routes';
import bookRoutes from './routes/book.routes';
import borrowRoutes from './routes/borrow.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/borrow', borrowRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;