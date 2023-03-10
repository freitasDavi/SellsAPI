import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/Login.dto';
import { ReturnLoginDTO } from './dtos/ReturnLogin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDTO): Promise<ReturnLoginDTO> {
        return await this.authService.login(loginDto);
    }
}
