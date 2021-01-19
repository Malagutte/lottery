import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

export default class TaksDto {

    @ApiProperty()
    id: string

    @ApiProperty({name : `is_closed`})
    @Expose({ name: "is_closed" })
    isClosed: boolean

    @ApiProperty({name : `init_date`})
    @Expose({ name: "init_date" })
    initDate: Date

    @ApiProperty({name : `end_date`})
    @Expose({ name: "end_date" })
    endDate: Date
}
