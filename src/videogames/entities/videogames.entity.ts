import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Videogame extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], required: true })
  platform: string[];
}

export interface VideogameDoc extends Videogame {
  _id: unknown;
}

export const VideogameSchema = SchemaFactory.createForClass(Videogame);
