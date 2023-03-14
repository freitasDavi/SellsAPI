import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const UserEntityMock: UserEntity = {
    cpf: '123456789',
    createdAt: new Date(),
    email: 'mock@email.com',
    id: 15231,
    name: 'Mock',
    password: 'mock123',
    phone: '44991308093',
    typeUser: UserType.User,
    updatedAt: new Date(),
};
