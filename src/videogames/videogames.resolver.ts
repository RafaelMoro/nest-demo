import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VideogameGqlModel } from './videogame.model';
import { VideogamesService } from './services/videogames.service';
import { CreateVideogameArgs, EditVideogameArgs } from './videogames.args';

@Resolver((of) => VideogameGqlModel)
export class VideogameResolvers {
  constructor(private videogameService: VideogamesService) {}

  @Query((returns) => [VideogameGqlModel])
  async videogames() {
    const data = await this.videogameService.findAllVideogames();
    return data;
  }

  @Query((returns) => VideogameGqlModel, { name: 'videogame', nullable: true })
  async getVideogame(@Args('name') name: string) {
    const videogame = await this.videogameService.getSingleVideogame(name);
    return videogame;
  }

  @Mutation(() => VideogameGqlModel, { name: 'addVideogame' })
  async createVideogame(@Args() args: CreateVideogameArgs) {
    return this.videogameService.createVideogame(args);
  }

  @Mutation(() => VideogameGqlModel, { name: 'editVideogame', nullable: true })
  async editVideogame(@Args() args: EditVideogameArgs) {
    return this.videogameService.updateVideogame(args);
  }

  @Mutation(() => VideogameGqlModel, { name: 'deleteVideogame' })
  async deleteVideogame(@Args('videogameId') videogameId: string) {
    return this.videogameService.deleteVideogame(videogameId);
  }

  // @ResolveField()
  // async posts(@Parent() author: Author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}
