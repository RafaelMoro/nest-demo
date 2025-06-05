import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { Public } from '@/auth/decorators/public/public.decorator';
import { JwtGuard } from '@/auth/guards/jwt-guard/jwt-guard.guard';
import { VideogamesService } from '../services/videogames.service';
import { CreateVideogameDto, UpdateVideogameDto } from '../dtos/videogames.dto';
import { Roles } from '@/auth/decorators/roles/roles.decorator';
import { RolesGuard } from '@/auth/guards/roles/roles.guard';

@UseGuards(JwtGuard)
@Controller('videogames')
export class VideogamesController {
  constructor(private videogameService: VideogamesService) {}

  @Get()
  @Public()
  async getAllVideogames() {
    return this.videogameService.findAllVideogames();
  }

  @Roles('admin', 'editor')
  @UseGuards(RolesGuard)
  @Get('protected')
  async getAllVideogamesWithRole() {
    return this.videogameService.findAllVideogames();
  }

  @Get(':name')
  @Public()
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

  @Delete(':videogameId')
  async deleteVideogame(@Param('videogameId') videogameId: string) {
    return this.videogameService.deleteVideogame(videogameId);
  }
}
