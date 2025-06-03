import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  readonly middleName: string;

  @IsBoolean()
  readonly hasGoogleLogin: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
