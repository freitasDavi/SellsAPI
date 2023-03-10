import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ReturnUserDto } from 'src/user/dtos/ReturnUser.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dtos/Login.dto';
import { LoginPayloadDTO } from './dtos/LoginPayload.dto';
import { ReturnLoginDTO } from './dtos/ReturnLogin.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDTO): Promise<ReturnLoginDTO> {
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

        return {
            accessToken: this.jwtService.sign({ ...new LoginPayloadDTO(user) }),
            user: new ReturnUserDto(user),
        };
    }
}
