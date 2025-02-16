import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/config';
import Borrowing from './borrowing.model'; // Use default import

interface BookAttributes {
    id: number;
    name: string;
    borrowings?: Borrowing[];
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
    public id!: number;
    public name!: string;

    // Define associations
    public borrowings?: Borrowing[];
}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'book',
});

export { Book };