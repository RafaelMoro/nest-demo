/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { GOOGLE_STRATEGY } from '@/constants';
import config from '@/config';
import { getGoogleCallbackUri } from '../auth.utils';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  GOOGLE_STRATEGY,
) {
  constructor(
    private authService: AuthService,
    @Inject(config.KEY) configService: ConfigType<typeof config>,
  ) {
    super({
      clientID: configService.auth.googleClient ?? '',
      clientSecret: configService.auth.googleClientSecret ?? '',
      callbackURL: getGoogleCallbackUri(configService.env, configService.feUri),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    // Do not use the accessToken and refreshToken gotten from Google, we have to create our own.
    const { name, emails } = profile;
    const currentUser = await this.authService.validateGoogleUser({
      email: emails[0].value as string,
      firstName: name.givenName as string,
      middleName: '',
      lastName: name.familyName as string,
      password: '', // Google OAuth does not use a password
    });
    done(null, currentUser);
  }
}
