import { ApiProperty } from '@nestjs/swagger';
export default class Search {
  @ApiProperty({ enum: [`MEGASENA`, `LOTOFACIL`, `QUINA`], type: [] })
  types: string[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  amount: number;

  @ApiProperty({ enum: [`DESC`, `ASC`] })
  order: EOrder;

  @ApiProperty({ type: Date })
  from: Date;

  @ApiProperty({ type: Date })
  to: Date;

  @ApiProperty()
  fields: string[];
}
