import { Module } from '@nestjs/common';
import { VideogamesController } from './controller/videogames.controller';
import { VideogamesService } from './services/videogames.service';

@Module({
  controllers: [VideogamesController],
  providers: [VideogamesService],
})
export class VideogamesModule {}
