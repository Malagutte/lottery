import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import AwardDto from './award.dto';
export class GameDto {

    @ApiProperty()
    id: string

    @ApiProperty({ name: "game_number" })
    @Expose({ name: "game_number" })
    gameNumber: number

    @ApiProperty()
    date: Date

    @ApiProperty()
    numbers: number[]

    @ApiProperty({ type: AwardDto })
    awards: AwardDto[]
}