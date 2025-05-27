import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType({ description: 'Videogame model' })
export class VideogameGqlModel {
  @Field((type) => ID)
  _id: string;

  @Field({ description: 'Videogame name' })
  name: string;

  @Field({ description: 'Videogame description' })
  description: string;

  @Field({ description: 'Videogame price' })
  price: number;

  @Field((type) => [String])
  platform: string[];
}
