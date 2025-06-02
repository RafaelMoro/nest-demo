import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { UserDoc } from '../users/entities/users.entity';
import { PayloadToken } from './auth.interface';

export const generateJWT = (user: UserDoc, jwtService: JwtService) => {
  const mongoId = user._id as Types.ObjectId;
  const mongoIdString = mongoId.toString();
  const payload: PayloadToken = { sub: mongoIdString };
  return jwtService.sign(payload);
};
