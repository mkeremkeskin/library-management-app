import { User } from '../models/user.model';

export const getUserById = async (id: number) => {
    return await User.findByPk(id);
};

export const createUser = async (name: string) => {
    return await User.create({ name });
};