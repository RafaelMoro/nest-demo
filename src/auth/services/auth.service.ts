/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '@/users/services/users.service';
import { User, UserDoc } from '@/users/entities/users.entity';
import { generateJWT } from '../auth.utils';
import { LoginData } from '@/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validatePasswordOfUser(email: string, password: string) {
    const user: UserDoc | null = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rta } = user.toJSON();
      return rta;
    }
    return null;
  }

  generateJWTAuth(user: User): LoginData {
    const accessToken = generateJWT(user, this.jwtService);
    const loginData: LoginData = {
      accessToken,
      user,
    };
    return loginData;
  }
}
