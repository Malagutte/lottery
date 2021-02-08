import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Award } from './award.model';

export type GameDocument = Game & mongoose.Document;
@Schema()
export class Game {
  @Prop()
  id: string;

  @Prop()
  type: string;

  @Prop()
  number: number;

  @Prop()
  date: Date;

  @Prop()
  awards: Award[];

  @Prop()
  numbers: number[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
