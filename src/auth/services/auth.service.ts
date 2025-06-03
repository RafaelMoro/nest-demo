import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '@/users/services/users.service';
import { User, UserDoc } from '@/users/entities/users.entity';
import { generateJWT } from '../auth.utils';
import { LoginData } from '@/users/users.interface';
import { CreateUserDto } from '@/users/dtos/users.dto';

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

  async validateGoogleUser(googleUser: CreateUserDto) {
    try {
      const userFound = await this.usersService.findByEmail(googleUser.email);
      if (userFound) return userFound;
      return await this.usersService.createUser(googleUser);
    } catch (error) {
      throw new NotFoundException(
        'Error validating Google user',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        error.message,
      );
    }
  }

  googleLogin(user: Express.User | undefined) {
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'User information from google',
      user,
    };
  }
}
