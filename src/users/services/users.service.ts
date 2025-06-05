/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User, UserDoc } from '../entities/users.entity';
import { USER_EXISTS_ERROR } from '@/constants';
import { CreateUserProps, CreateUserResponse, Role } from '../users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<UserDoc | null> {
    try {
      return this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createUser({
    data,
    skipCheckUser,
  }: CreateUserProps): Promise<CreateUserResponse> {
    try {
      //Verify if the user exists with the same email.
      const { email: emailData, role } = data;
      const acceptedRoles: Role[] = ['admin', 'user', 'editor'];
      const hasAcceptedRole = role.some((r) =>
        acceptedRoles.includes(r as Role),
      );
      if (!hasAcceptedRole) {
        throw new BadRequestException('Invalid role');
      }

      if (!skipCheckUser) {
        const user: UserDoc | null = await this.findByEmail(emailData);
        if (user) throw new BadRequestException(USER_EXISTS_ERROR);
      }

      const userModel = new this.userModel(data);
      const passwordHashed = await bcrypt.hash(userModel.password, 10);
      userModel.password = passwordHashed;
      const modelSaved: UserDoc = await userModel.save();
      const responseCreateUser = modelSaved.toJSON();
      const {
        email,
        firstName,
        lastName,
        role: roleResponse,
      } = responseCreateUser;
      const response: CreateUserResponse = {
        email,
        firstName,
        lastName,
        role: roleResponse,
      };
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
