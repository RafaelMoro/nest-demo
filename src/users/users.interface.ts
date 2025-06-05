import { CreateUserDto } from './dtos/users.dto';

export type Role = 'admin' | 'user' | 'editor';

export interface CreateUserResponse {
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginDataUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  accessToken: string;
  user: LoginDataUser;
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
