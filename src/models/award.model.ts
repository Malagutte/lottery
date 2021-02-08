import { Prop } from '@nestjs/mongoose';

export class Award {
  @Prop()
  hits: number;

  @Prop()
  moneyValue: number;

  @Prop()
  totalWinners: number;
}
