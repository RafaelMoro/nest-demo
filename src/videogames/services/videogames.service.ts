/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Videogame, VideogameDoc } from '../entities/videogames.entity';
import { CreateVideogameDto, UpdateVideogameDto } from '../dtos/videogames.dto';

@Injectable()
export class VideogamesService {
  constructor(
    @InjectModel(Videogame.name) private videogameModel: Model<Videogame>,
  ) {}

  async findAllVideogames(): Promise<VideogameDoc[]> {
    try {
      const videogames: VideogameDoc[] = await this.videogameModel
        .find()
        .exec();
      if (!videogames) {
        return [];
      }
      return videogames;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getSingleVideogame(name: string): Promise<VideogameDoc | null> {
    try {
      const videogames: VideogameDoc[] = await this.videogameModel
        .find({ name })
        .exec();
      if (videogames.length === 0) {
        return null;
      }
      const [videogame] = videogames;
      return videogame;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createVideogame(data: CreateVideogameDto): Promise<VideogameDoc> {
    try {
      const model = new this.videogameModel(data);
      const modelSaved: VideogameDoc = await model.save();
      return modelSaved;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateVideogame(
    data: UpdateVideogameDto,
  ): Promise<VideogameDoc | null> {
    try {
      const { videogameId } = data;
      const videogame: VideogameDoc | null = await this.videogameModel
        .findByIdAndUpdate(videogameId, { $set: data }, { new: true })
        .exec();
      if (!videogame) {
        return null;
      }
      return videogame;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteVideogame(id: string): Promise<VideogameDoc | null> {
    try {
      const videogame: VideogameDoc | null = await this.videogameModel
        .findByIdAndDelete(id)
        .exec();
      return videogame;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
