import { Body, Controller, Get, HttpStatus, Logger, Param, Post, Res } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from "express"
import { GameDto } from 'src/dto/game.dto'
import TaksDto from 'src/dto/task.dto'
import Search from './dto/request/search.request'
import { GameService } from './game.service'
@ApiTags(`game`)
@Controller('/api/v1/game')
export class GameController {
    constructor(private gameService: GameService) { }

    @ApiResponse({ status: 200, type: GameDto })
    @ApiResponse({ status: 500, description:`Error` })
    @Get('/:type/:game_number')
    getGame(@Param('game_number') gameNumber: number,
        @Param('type') type: string,
        @Res() response: Response) {

        //TODO param validation
        this.gameService.getGameByTypeAndNumber(type, gameNumber)
            .then((result) => {

                if (result != null) {
                    response.json(result).status(HttpStatus.OK)
                } else {
                    response.status(HttpStatus.NO_CONTENT).send()
                }
            })
            .catch((error) => {
                Logger.error(error)
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
            })
    }

    @Post('/search')
    @ApiResponse({ status: 200, type: [GameDto] })
    @ApiResponse({ status: 500, description:`Error` })
    search(@Body() request: Search, @Res() response: Response) {
        this.gameService.search(request)
            .then((res) => {
                response.status(HttpStatus.OK).json(res)
            })
            .catch((error) => {
                Logger.error(error)
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
            })
    }

    @Post('/update')
    @ApiResponse({ status: 202, type: TaksDto })
    @ApiResponse({ status: 500, description:`Error` })
    update(@Res() response: Response) {

        this.gameService.updateInformation()
            .then((res) => {
                response.json(res).status(HttpStatus.ACCEPTED)
            })
            .catch((error) => {
                response.json(error).status(HttpStatus.INTERNAL_SERVER_ERROR)
            })

    }
}