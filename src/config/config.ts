import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('library_db', 'your_username', 'your_password', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});

export { sequelize };