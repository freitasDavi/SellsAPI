import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUser: CreateUserDTO): Promise<User> {
        return await this.userService.createUser(createUser);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }
}
