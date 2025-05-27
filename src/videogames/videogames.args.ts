import { ArgsType, Field } from '@nestjs/graphql';

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
