import { CreateUserDto } from './dtos/users.dto';
import { User } from './entities/users.entity';

export interface CreateUserResponse {
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  accessToken: string;
  user: User;
}

export interface CreateUserProps {
  data: CreateUserDto;
  skipCheckUser?: boolean;
}

interface GoogleProfileName {
  familyName: string;
  givenName: string;
}

interface GoogleProfileEmail {
  value: string;
  verified: boolean;
}
export interface GoogleProfile {
  name: GoogleProfileName;
  emails: GoogleProfileEmail[];
}
