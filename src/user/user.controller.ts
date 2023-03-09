import {
    Body,
    Controller,
    Post,
    Get,
    UsePipes,
    ValidationPipe,
    Param,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/CreateUser.dto';
import { ReturnUserDto } from './dtos/ReturnUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
        return await this.userService.createUser(createUser);
    }

    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return await (
            await this.userService.getAllUsers()
        ).map((userEntity) => new ReturnUserDto(userEntity));
    }

    @Get('/:userId')
    async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
        return new ReturnUserDto(
            await this.userService.getUserByIdUsingRelations(userId),
        );
    }
}
