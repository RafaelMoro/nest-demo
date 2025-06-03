import { CreateUserDto } from './dtos/users.dto';
import { User } from './entities/users.entity';

export interface CreateUserResponse {
  email: string;
  sub: string;
}

export interface LoginData {
  accessToken: string;
  user: User;
}

export interface CreateUserProps {
  data: CreateUserDto;
  skipCheckUser?: boolean;
}
