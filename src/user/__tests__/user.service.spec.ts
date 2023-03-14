import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';
import { CreateUserMock } from '../__mocks__/createUser.mock';
import { UserEntityMock } from '../__mocks__/user.mock';

describe('UserService', () => {
    let service: UserService;
    let userRepository: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserEntity),
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(UserEntityMock),
                        save: jest.fn().mockResolvedValue(UserEntityMock),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userRepository).toBeDefined();
    });

    it('should return user in findUserByEmail', async () => {
        const user = await service.findUserByEmail(UserEntityMock.email);

        expect(user).toEqual(UserEntityMock);
    });

    it('should return error in findUserByEmail', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

        expect(
            service.findUserByEmail(UserEntityMock.email),
        ).rejects.toThrowError();
    });

    it('should return error in findUserByEmail (error DB)', async () => {
        jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(
            new Error(),
        );

        expect(
            service.findUserByEmail(UserEntityMock.email),
        ).rejects.toThrowError();
    });

    it('should return user in findUserById', async () => {
        const user = await service.findUserById(UserEntityMock.id);

        expect(user).toEqual(UserEntityMock);
    });

    it('should return error in findUserById', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

        expect(service.findUserById(UserEntityMock.id)).rejects.toThrowError();
    });

    it('should return error in findUserById (error DB)', async () => {
        jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(
            new Error(),
        );

        expect(service.findUserById(UserEntityMock.id)).rejects.toThrowError();
    });

    it('should return user in getUserByIdUsingRelations', async () => {
        const user = await service.getUserByIdUsingRelations(UserEntityMock.id);

        expect(user).toEqual(UserEntityMock);
    });

    it('should return error if user exists', async () => {
        expect(service.createUser(CreateUserMock)).rejects.toThrowError();
    });

    it('should return user if user not exists', async () => {
        jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

        const user = await service.createUser(CreateUserMock);

        expect(user).toEqual(UserEntityMock);
    });
});
