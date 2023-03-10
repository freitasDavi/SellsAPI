import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dtos/Login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async login(loginDto: LoginDTO): Promise<UserEntity> {
        const user: UserEntity = await this.userService
            .findUserByEmail(loginDto.email)
            .catch(() => undefined);

        const passwordsMatch = await compare(
            loginDto.password,
            user?.password || ' ',
        );

        if (!user || !passwordsMatch) {
            throw new NotFoundException('User or email invalid');
        }

        return user;
    }
}
