import { Module } from '@nestjs/common';
import { VideogamesController } from './controller/videogames.controller';

@Module({
  controllers: [VideogamesController],
})
export class VideogamesModule {}
