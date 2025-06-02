import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';

import { JWT_STRATEGY } from '@/constants';
import { PayloadToken } from '../auth.interface';
import config from '@/config';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      secretOrKey: configService.auth.jwtKey ?? '',
    });
  }

  validate(payload: PayloadToken) {
    return payload;
  }
}
