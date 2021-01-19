import { ApiProperty } from '@nestjs/swagger';
export default class Search {

    @ApiProperty({ enum: [`MEGASENA`, `LOTOFACIL`], type: [] })
    types: string[]

    @ApiProperty()
    page: number

    @ApiProperty()
    amount: number

    @ApiProperty({ enum: [`DESC`, `ASC`] })
    order: EOrder

}