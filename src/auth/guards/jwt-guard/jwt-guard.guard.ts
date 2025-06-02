/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';

import { JWT_STRATEGY } from '@/constants';
import config from '@/config';

@Injectable()
export class JwtGuard extends AuthGuard(JWT_STRATEGY) {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(
      this.configService.auth.publicKey,
      context.getHandler(),
    );
    if (isPublic) return true;

    return super.canActivate(context);
  }
}
