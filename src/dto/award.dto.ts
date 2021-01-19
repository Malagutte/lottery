import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"


export default class AwardDto {
    
    @ApiProperty()
    id: string
    
    @ApiProperty()
    hits: number
    
    @ApiProperty()
    @Expose({ name: "money_value" })
    moneyValue: number
    
    @ApiProperty()
    @Expose({ name: "total_winners" })
    totalWinners: number

}