import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VideogameGqlModel {
  @Field()
  _id: number;

  @Field({ nullable: true, description: 'Videogame name' })
  name: string;

  @Field({ nullable: true, description: 'Videogame description' })
  description: string;

  @Field({ nullable: true, description: 'Videogame price' })
  price: number;
}
