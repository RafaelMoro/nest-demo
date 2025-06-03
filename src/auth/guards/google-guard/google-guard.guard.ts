import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { GOOGLE_STRATEGY } from '@/constants';
import config from '@/config';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard(GOOGLE_STRATEGY) {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    super({
      // Google returns a refresh token after successful authentication
      accessType: 'offline',
    });
  }
}
