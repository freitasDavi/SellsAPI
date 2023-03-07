import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
        return await this.userService.createUser(createUser);
    }

    @Get()
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userService.getAllUsers();
    }
}
