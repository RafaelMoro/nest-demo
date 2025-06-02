/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth.service';
import { LOCAL_STRATEGY } from '@/constants';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const validUser = await this.authService.validatePasswordOfUser(
      email,
      password,
    );
    if (!validUser)
      throw new UnauthorizedException('Email or Password incorrect.');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return validUser;
  }
}
