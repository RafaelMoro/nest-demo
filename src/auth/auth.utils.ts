import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { UserDoc } from '../users/entities/users.entity';
import { PayloadToken } from './auth.interface';
import { DEV_ENV } from '@/constants';

export const generateJWT = (user: UserDoc, jwtService: JwtService) => {
  const mongoId = user._id as Types.ObjectId;
  const mongoIdString = mongoId.toString();
  const payload: PayloadToken = { sub: mongoIdString };
  return jwtService.sign(payload);
};

export const getGoogleCallbackUri = (
  env: string | undefined,
  feUri: string | undefined,
): string => {
  if (!env || !feUri) {
    throw new Error(
      'Environment variables for Google callback URI are not set.',
    );
  }
  if (env === DEV_ENV) {
    return 'http://localhost:3000/auth/google-redirect';
  }
  return `${feUri}/auth/google-redirect`;
};
