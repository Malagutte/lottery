import { Expose } from 'class-transformer';
import AwardDto from './award.dto';
export class GameDto {
    
    id: string
    
    @Expose({ name: "game_number" })
    gameNumber: number
    date: Date
    numbers: number[]
    awards: AwardDto[]
}