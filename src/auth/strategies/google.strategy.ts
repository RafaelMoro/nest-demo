/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { GOOGLE_STRATEGY } from '@/constants';
import config from '@/config';
import { createRandomString, getGoogleCallbackUri } from '../auth.utils';
import { AuthService } from '../services/auth.service';
import { GoogleProfile } from '@/users/users.interface';

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
    profile: GoogleProfile,
    done: VerifyCallback,
  ) {
    try {
      // Do not use the accessToken and refreshToken gotten from Google, we have to create our own.
      const { name, emails } = profile;
      const [email] = emails;
      const tempPassword = createRandomString(20);
      const currentUser = await this.authService.validateGoogleUser({
        email: email.value,
        firstName: name.givenName,
        lastName: name.familyName,
        password: tempPassword, // Google OAuth does not use a password
        hasGoogleLogin: true,
        role: ['user'],
      });
      done(null, currentUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
