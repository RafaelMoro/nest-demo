import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class CreateVideogameArgs {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: string;

  @Field((type) => [String])
  platform: string[];
}

@ArgsType()
export class EditVideogameArgs {
  @Field(() => ID)
  videogameId: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  price: string;

  @Field(() => [String], { nullable: true })
  platform: string[];
}
