import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { GenerateJWTUser, PayloadToken } from './auth.interface';
import { DEV_ENV } from '@/constants';

export const generateJWT = (user: GenerateJWTUser, jwtService: JwtService) => {
  if (!user._id && !user.sub)
    throw new Error('User id or user sub does not exist');

  if (user.sub) {
    const payload: PayloadToken = { sub: user.sub };
    return jwtService.sign(payload);
  }
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
    return 'http://localhost:6006/auth/google-redirect';
  }
  return `${feUri}/auth/google-redirect`;
};

export function createRandomString(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
