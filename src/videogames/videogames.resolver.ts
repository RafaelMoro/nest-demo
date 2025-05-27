/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { VideogameGqlModel } from './videogame.model';
import { VideogamesService } from './services/videogames.service';

@Resolver((of) => VideogameGqlModel)
export class VideogameResolvers {
  constructor(private videogameServide: VideogamesService) {}

  @Query((returns) => [VideogameGqlModel])
  async videogames() {
    const data = await this.videogameServide.findAllVideogames();
    return data;
  }

  @Query((returns) => VideogameGqlModel, { name: 'videogame', nullable: true })
  async getVideogame(@Args('name') name: string) {
    const videogame = await this.videogameServide.getSingleVideogame(name);
    return videogame;
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
