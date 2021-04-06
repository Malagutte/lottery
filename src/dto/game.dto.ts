import { ApiProperty } from '@nestjs/swagger';
import AwardDto from './award.dto';

export class GameDto {
  @ApiProperty()
  id: string;

  number: number;

  type: string;

  @ApiProperty()
  date: String;

  @ApiProperty()
  numbers: number[];

  @ApiProperty({ type: AwardDto })
  awards: AwardDto[];
}
