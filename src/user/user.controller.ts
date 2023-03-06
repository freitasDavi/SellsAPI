import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/CreateUser.dto';

@Controller('user')
export class UserController {
    @Post()
    async createUser(@Body() createUser: CreateUserDTO) {
        return {
            ...createUser,
            password: undefined,
        };
    }
}
