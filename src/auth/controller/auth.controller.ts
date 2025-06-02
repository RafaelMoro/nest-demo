import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { LOCAL_STRATEGY } from '@/constants';
import { User } from '@/users/entities/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  @UseGuards(AuthGuard(LOCAL_STRATEGY))
  @Post()
  login(@Req() request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = request.user as User;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.authService.generateJWTAuth(user);
  }
}
