import { Body, Controller, Get, HttpStatus, Logger, Param, Post, Req, Res } from '@nestjs/common'
import { Request, Response } from "express"
import Search from './dto/request/search.request'
import { GameService } from './game.service'

@Controller('/api/v1/game')
export class GameController {
    constructor(private gameService: GameService) { }

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
    search(@Body() request: Search, @Res() response: Response) {
        this.gameService.search(request)
        .then((res)=>{
            response.status(HttpStatus.OK).json(res).send()
        })
        .catch((res)=>{
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(res).send()
        })
    }

    @Post('/update')
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