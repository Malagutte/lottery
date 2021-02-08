import { ApiProperty } from '@nestjs/swagger';

export default class AwardDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  hits: number;

  @ApiProperty({ name: 'money_value' })
  moneyValue: number;

  @ApiProperty({ name: 'total_winners' })
  totalWinners: number;
}
