/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get } from '@nestjs/common';
import { VideogamesService } from '../services/videogames.service';

@Controller('videogames')
export class VideogamesController {
  constructor(private videogameService: VideogamesService) {}

  @Get()
  async getAllVideogames() {
    return this.videogameService.findAllVideogames();
  }
}
