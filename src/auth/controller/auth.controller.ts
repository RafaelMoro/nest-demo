import { Controller, Post, UseGuards, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  LOCAL_STRATEGY,
  PROD_ENV,
} from '@/constants';
import { User } from '@/users/entities/users.entity';
import { GoogleOAuthGuard } from '../guards/google-guard/google-guard.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard(LOCAL_STRATEGY))
  @Post('local')
  loginLocal(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = request.user as User;

    const res = this.authService.generateJWTAuth(user);
    response.cookie(ACCESS_TOKEN_COOKIE_NAME, res.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === PROD_ENV,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
    });
    return {
      user: res.user,
    };
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() request: Request) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() request: Request) {
    console.log('here in google redirect');
    const user = request.user;
    return this.authService.googleLogin(user);
  }
}
