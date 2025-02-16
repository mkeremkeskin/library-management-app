import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/config';
import Borrowing from './borrowing.model'; // Use default import

interface UserAttributes {
    id: number;
    name: string;
    pastBorrowings?: Borrowing[];
    presentBorrowings?: Borrowing[];
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;

    // Define associations
    public pastBorrowings?: Borrowing[];
    public presentBorrowings?: Borrowing[];
}

User.init({
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
    modelName: 'user',
});

export { User };