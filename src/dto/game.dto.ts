import { ApiProperty } from '@nestjs/swagger';
import AwardDto from './award.dto';

export class GameDto {
  @ApiProperty()
  id: string;

  number: number;

  type: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  numbers: number[];

  @ApiProperty({ type: AwardDto })
  awards: AwardDto[];
}
