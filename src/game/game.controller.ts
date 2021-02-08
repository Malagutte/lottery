import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameDto } from 'src/dto/game.dto';
import { TaskDto } from 'src/dto/task.dto';
import Search from './dto/request/search.request';
import { GameService } from './game.service';

@ApiTags(`game`)
@Controller('/api/v1/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @ApiResponse({ status: 200, type: GameDto })
  @ApiResponse({ status: 500, description: `Error` })
  @Get('/:type/:game_number')
  @HttpCode(HttpStatus.OK)
  getGame(
    @Param('game_number') gameNumber: number,
    @Param('type') type: string,
  ) {
    return this.gameService
      .getGameByTypeAndNumber(type, gameNumber)
      .then((result) => {
        return result;
      });
  }

  @Post('/search')
  @ApiResponse({ status: 200, type: [GameDto] })
  @ApiResponse({ status: 500, description: `Error` })
  @HttpCode(HttpStatus.OK)
  search(@Body() request: Search) {
    return this.gameService.search(request).then((res) => {
      return res;
    });
  }

  @Post('/update')
  @ApiResponse({ status: 202, type: TaskDto })
  @ApiResponse({ status: 500, description: `Error` })
  @HttpCode(HttpStatus.ACCEPTED)
  update() {
    return this.gameService
      .updateInformation()
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
}
