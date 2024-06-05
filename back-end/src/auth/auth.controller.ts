import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { log } from 'console';
import { LoginDto } from './DTOs/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    log(loginDto.email);
    return await this.authService.login(loginDto);
  }
}