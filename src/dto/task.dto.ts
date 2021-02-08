import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ name: `is_closed` })
  isClosed: boolean;

  @ApiProperty({ name: `init_date` })
  initDate: Date;

  @ApiProperty({ name: `end_date` })
  endDate: Date;
}
