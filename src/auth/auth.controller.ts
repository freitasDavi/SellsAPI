import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ReturnUserDto } from 'src/user/dtos/ReturnUser.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/Login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDTO): Promise<ReturnUserDto> {
        return new ReturnUserDto(await this.authService.login(loginDto));
    }
}
