import { Expose } from "class-transformer"

export default class TaksDto {

    
    id: string

    @Expose({ name: "is_closed" })
    isClosed: boolean

    @Expose({ name: "init_date" })
    initDate: Date

    @Expose({ name: "end_date" })
    endDate: Date
}
