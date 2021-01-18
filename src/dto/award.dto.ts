import { Expose } from "class-transformer"

export default class AwardDto {
    
    id: String
    
    hits: number
    
    @Expose({ name: "money_value" })
    moneyValue: number
    
    @Expose({ name: "total_winners" })
    totalWinners: number

}