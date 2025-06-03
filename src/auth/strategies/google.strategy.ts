import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';

import { AuthService } from '../services/auth.service';
import { GOOGLE_STRATEGY } from '@/constants';
import config from '@/config';
import { getGoogleCallbackUri } from '../auth.utils';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  GOOGLE_STRATEGY,
) {
  constructor(
    private authService: AuthService,
    @Inject(config.KEY) configService: ConfigType<typeof config>,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      clientID: configService.auth.googleClient,
      clientSecret: configService.auth.googleClientSecret,
      callbackURL: getGoogleCallbackUri(configService.env, configService.feUri),
      // scope: ['email', 'profile'],
    });
  }

  // TODO: Pendiente
  async validate(email: string, password: string) {
    const validUser = await this.authService.validatePasswordOfUser(
      email,
      password,
    );
    if (!validUser)
      throw new UnauthorizedException('Email or Password incorrect.');

    return validUser;
  }
}
