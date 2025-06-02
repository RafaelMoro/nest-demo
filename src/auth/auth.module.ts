import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controller/auth.controller';

@Module({
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
