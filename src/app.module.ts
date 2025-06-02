import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { VideogamesModule } from './videogames/videogames.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        CLUSTER: Joi.string().required(),
        MONGO_USER: Joi.string().required(),
        MONGO_PWD: Joi.string().required(),
        MONGO_DB_NAME: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
        JWT_KEY: Joi.string().required(),
        PUBLIC_KEY: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      graphiql: true,
    }),
    DatabaseModule,
    VideogamesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
