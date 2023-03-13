import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const user = await this.findUserByEmail(createUserDTO.email).catch(
            () => undefined,
        );

        if (user) {
            throw new BadRequestException('Email is already in use');
        }

        const saltOrRounds = 10;

        const passwordHashed = await hash(createUserDTO.password, saltOrRounds);

        return await this.userRepository.save({
            ...createUserDTO,
            typeUser: 1,
            password: passwordHashed,
        });
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new NotFoundException(`User with Id ${userId} not found`);
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            throw new NotFoundException(`User password or email is invalid`);
        }

        return user;
    }

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: {
                id: userId,
            },
            relations: {
                addresses: {
                    city: {
                        state: true,
                    },
                },
            },
        });
    }
}
