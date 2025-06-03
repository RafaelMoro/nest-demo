/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

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
  async validateGoogle(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    console.log('profile', profile);
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    done(null, user);
  }
}
