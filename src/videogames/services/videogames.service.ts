/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Videogame } from '../entities/videogames.entity';
import { CreateVideogameDto } from '../dtos/videogames.dto';

@Injectable()
export class VideogamesService {
  constructor(
    @InjectModel(Videogame.name) private videogameModel: Model<Videogame>,
  ) {}

  async findAllVideogames() {
    try {
      const videogames = await this.videogameModel.find().exec();
      if (!videogames) {
        return 'No videogames found';
      }
      return videogames;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createVideogame(data: CreateVideogameDto) {
    try {
      const model = new this.videogameModel(data);
      const modelSaved = await model.save();
      return modelSaved;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
