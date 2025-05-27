/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { VideogamesService } from '../services/videogames.service';
import { CreateVideogameDto } from '../dtos/videogames.dto';

@Controller('videogames')
export class VideogamesController {
  constructor(private videogameService: VideogamesService) {}

  @Get()
  async getAllVideogames() {
    return this.videogameService.findAllVideogames();
  }

  @Post()
  async createOneVideogame(@Body() payload: CreateVideogameDto) {
    return this.videogameService.createVideogame(payload);
  }
}
