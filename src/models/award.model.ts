import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AwardDocument = Award & mongoose.Document;

@Schema()
export class Award {

  @Prop()
  hits: number;

  @Prop()
  money_value: number;

  @Prop()
  total_winners: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Game'})
  game_id:string
}


export const AwardSchema = SchemaFactory.createForClass(Award);