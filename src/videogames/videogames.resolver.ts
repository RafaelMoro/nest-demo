/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Query, Resolver } from '@nestjs/graphql';
import { VideogameGqlModel } from './videogame.model';
import { VideogamesService } from './services/videogames.service';

@Resolver(() => VideogameGqlModel)
export class VideogameResolvers {
  constructor(private videogameServide: VideogamesService) {}

  @Query((returns) => [VideogameGqlModel])
  async videogames() {
    const data = await this.videogameServide.findAllVideogames();
    return data;
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
