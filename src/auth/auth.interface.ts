import { Role } from '@/users/users.interface';

export interface PayloadToken {
  email: string;
  firstName: string;
  lastName: string;
  role: Role[];
}

export interface GenerateJWTUser {
  email: string;
  firstName: string;
  lastName: string;
  role: Role[];
}
