/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { VideogamesController } from './controller/videogames.controller';
import { VideogamesService } from './services/videogames.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Videogame, VideogameSchema } from './entities/videogames.entity';
import { VideogameResolvers } from './videogames.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Videogame.name,
        schema: VideogameSchema,
      },
    ]),
  ],
  controllers: [VideogamesController],
  providers: [VideogamesService, VideogameResolvers],
})
export class VideogamesModule {}
