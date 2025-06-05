import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import config from '@/config';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '@/users/users.module';
import { JWT_EXPIRE_TIME } from '@/constants';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (
        configServices: ConfigType<typeof config>,
      ): JwtModuleOptions => {
        return {
          secret: configServices.auth.jwtKey ?? '',
          signOptions: {
            expiresIn: JWT_EXPIRE_TIME,
          },
        };
      },

      inject: [config.KEY],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
