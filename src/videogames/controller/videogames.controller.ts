import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { VideogamesService } from '../services/videogames.service';
import { CreateVideogameDto, UpdateVideogameDto } from '../dtos/videogames.dto';

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

  @Put()
  async editVideogame(@Body() payload: UpdateVideogameDto) {
    return this.videogameService.updateVideogame(payload);
  }
}
