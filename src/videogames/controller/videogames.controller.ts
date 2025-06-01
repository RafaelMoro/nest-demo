import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VideogamesService } from '../services/videogames.service';
import { CreateVideogameDto } from '../dtos/videogames.dto';

@Controller('videogames')
export class VideogamesController {
  constructor(private videogameService: VideogamesService) {}

  @Get()
  async getAllVideogames() {
    return this.videogameService.findAllVideogames();
  }

  @Get(':name')
  async getSingleVideogame(@Param('name') name: string) {
    return this.videogameService.getSingleVideogame(name);
  }

  @Post()
  async createOneVideogame(@Body() payload: CreateVideogameDto) {
    return this.videogameService.createVideogame(payload);
  }
}
