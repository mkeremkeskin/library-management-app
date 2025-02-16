import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/config';
import { User } from './user.model';
import { Book } from './book.model';

interface BorrowingAttributes {
    id: number;
    user_id: number;
    book_id: number;
    borrowed_at: Date;
    returned_at: Date | null;
    score: number | null;
}

interface BorrowingCreationAttributes extends Optional<BorrowingAttributes, 'id' | 'borrowed_at'> {}

class Borrowing extends Model<BorrowingAttributes, BorrowingCreationAttributes> implements BorrowingAttributes {
    public id!: number;
    public user_id!: number;
    public book_id!: number;
    public borrowed_at!: Date;
    public returned_at!: Date | null;
    public score!: number | null;

    // Define associations
    public user?: User;
    public book?: Book;
}

Borrowing.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    borrowed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    returned_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 10,
        },
    },
}, {
    sequelize,
    modelName: 'borrowing',
});

export default Borrowing;