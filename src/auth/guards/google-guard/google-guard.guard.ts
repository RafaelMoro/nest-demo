import { ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
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

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const isPublic = this.reflector.get(
      this.configService.auth.publicKey,
      context.getHandler(),
    );
    if (isPublic) return true;

    return super.canActivate(context);
  }
}
