# Library Management Application

A backend application for managing users, books, and borrowings in a library.

## Setup

1. **Clone the repository**:
  ```
git clone <repository-url>
cd library-management-app
  ```
2. **Install dependencies**:
  ```
npm install
  ```

3. **Set up the database**:
- Update the `.env` file with your database credentials.
- Run migrations:
  ```
  npm run migrate
  ```
- Seed the database:
  ```
  npm run seed
  ```

4. **Start the server**:
  ```
npm start
  ```

5. **Run tests**:
  ```
npm test
  ```

## API Endpoints

- **Users**:
- `GET /users` - List all users.
- `GET /users/:id` - Get user details.
- `POST /users` - Create a new user.

- **Books**:
- `GET /books` - List all books.
- `GET /books/:id` - Get book details.
- `POST /books` - Create a new book.

- **Borrow/Return**:
- `POST /users/:userId/borrow/:bookId` - Borrow a book.
- `POST /users/:userId/return/:bookId` - Return a book with a score.

## Technologies Used

- **Backend**: Node.js, Express.js, TypeScript.
- **Database**: PostgreSQL, Sequelize ORM.
- **Testing**: Jest, Supertest.
- **Caching**: Redis.
- **Validation**: express-validator.
- **Authentication**: JWT.

## License

This project is licensed under the MIT License.