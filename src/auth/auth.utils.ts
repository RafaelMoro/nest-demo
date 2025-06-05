import { JwtService } from '@nestjs/jwt';

import { GenerateJWTUser, PayloadToken } from './auth.interface';
import { DEV_ENV } from '@/constants';

export const generateJWT = (user: GenerateJWTUser, jwtService: JwtService) => {
  const payload: PayloadToken = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
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
