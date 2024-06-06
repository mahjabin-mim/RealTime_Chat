import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './DTOs/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.email);

    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const token = await this.signToken(user.id, user.email);
      return { user, token };
    }
    throw new UnauthorizedException('Email or password error!');
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secretKey = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '50m',
      secret: secretKey,
    });
    return token;
  }
}