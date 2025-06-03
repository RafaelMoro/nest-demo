/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User, UserDoc } from '../entities/users.entity';
import { USER_EXISTS_ERROR } from '@/constants';
import { CreateUserProps, CreateUserResponse } from '../users.interface';

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
      const { email: emailData } = data;
      if (!skipCheckUser) {
        const user: UserDoc | null = await this.findByEmail(emailData);
        if (user) throw new BadRequestException(USER_EXISTS_ERROR);
      }

      const userModel = new this.userModel(data);
      const passwordHashed = await bcrypt.hash(userModel.password, 10);
      userModel.password = passwordHashed;
      const modelSaved: UserDoc = await userModel.save();
      const responseCreateUser = modelSaved.toJSON();
      const { email, _id: sub } = responseCreateUser;
      const response: CreateUserResponse = {
        email,
        sub,
      };
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
