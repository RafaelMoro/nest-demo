import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Public } from '@/auth/decorators/public/public.decorator';
import { CreateUserDto } from '../dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.createUser({ data: payload });
  }
}
