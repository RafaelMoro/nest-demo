/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { VideogameGqlModel } from './videogame.model';
import { VideogamesService } from './services/videogames.service';

@Resolver(() => VideogameGqlModel)
export class VideogameResolvers {
  constructor(private videogameServide: VideogamesService) {}

  @Query(() => VideogameGqlModel)
  async videogame() {
    return this.videogameServide.findAllVideogames();
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
