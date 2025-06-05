import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsArray,
  MaxLength,
} from 'class-validator';
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

  @IsArray()
  @MaxLength(1, { each: true })
  @IsString({ each: true })
  @IsNotEmpty()
  readonly role: string[];

  @IsBoolean()
  readonly hasGoogleLogin: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
