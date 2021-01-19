import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/models/game.model';
import { Task } from 'src/models/task.model';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import Search from './dto/request/search.request';
import SearchResponseDto from './dto/response/search.dto.response';
import { modelToDto, responseToModel } from '../serialization/game.serialization';
import { modelToDto as modelToDtoTask } from '../serialization/task.serialization';
const requestp = require('request-promise')

@Injectable()
export class GameService {

  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) { }


  async getGameByTypeAndNumber(type: string, gameNumber: number) {
    const result = await this.gameRepository.findOne({
      join: {
        alias: "game",
        innerJoinAndSelect: {
          numbers: "game.numbers",
          awards: "game.awards"
        }
      },
      where: { type: type.toUpperCase(), number: gameNumber }
    })


    return modelToDto(result)
  }


  async updateInformation() {
    const task = new Task()
    task.id = uuid()
    task.initDate = new Date()

    const savedTask = await this.taskRepository.save(task)

    this.processUpdate(savedTask)

    return modelToDtoTask(savedTask);

  }


  private async processUpdate(openTask: Task) {

    const typesForRequest: { type: string, urlParameters: String }[] = [
      {
        type: "megasena",
        urlParameters: "megasena/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbwMPI0sDBxNXAOMwrzCjA0sjIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wNnUwNHfxcnSwBgIDUyhCvA5EawAjxsKckMjDDI9FQE-F4ca/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_HGK818G0KO6H80AU71KG7J0072/res/id=buscaResultado"
      },
      {
        type: "lotofacil",
        urlParameters: "lotofacil/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbz8vTxNDRy9_Y2NQ13CDA0sTIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wBmoxN_FydLAGAgNTKEK8DkRrACPGwpyQyMMMj0VAcySpRM!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_61L0H0G0J0VSC0AC4GLFAD2003/res/id=buscaResultado"
      }
    ]

    for (let i = 0; i < typesForRequest.length; i++) {
      const requestType = typesForRequest[i]

      const baseUrl = `http://loterias.caixa.gov.br/wps/portal/loterias/landing/${requestType.urlParameters}`
      const lastGame = await this.getLastGame(baseUrl);



      for (let index = lastGame; index > 0; index--) {

        try {
          const result = await this.gameRepository.find({ where: { type: requestType.type.toUpperCase(), number: index } })

          if (result.length > 0) {
            continue;
          }

          const requestUrl = `${baseUrl}/p=concurso=${index}`

          const body = await this.doRquest(requestUrl)

          const game = responseToModel(body)
          game.type = requestType.type.toUpperCase()
          await this.gameRepository.save(game)

          Logger.log(`Saved game ${game.type} - ${game.number}`)

        } catch (error) {
          Logger.error(`Error to save game ${requestType.type.toLowerCase()} - ${index}`)
          Logger.error(JSON.stringify(error))
        }


      }

    }


    this.closeTask(openTask)
  }

  async search(request: Search) {

    const results = await this.gameRepository.find({
      join: {
        alias: "game",
        innerJoinAndSelect: {
          numbers: "game.numbers",
          awards: "game.awards"
        }
      },
      order: {
        number: request.order
      },
      where: {
        type: In(request.types)
      },
      take: request.amount,
      skip: request.page
    })

    const games = results.map(result => (modelToDto(result)))
    const response = new SearchResponseDto()

    response.games = games
    response.amount = games.length
    response.page = request.page

    return response

  }


  private closeTask(task: Task) {
    if (task.isClosed) {
      return;
    }

    task.endDate = new Date()
    task.isClosed = true
    this.taskRepository.save(task)
  }

  private async doRquest(requestUrl: string) {

    const body = await requestp({
      method: 'GET',
      uri: requestUrl,
      jar: true
    });

    return JSON.parse(body)

  }

  private async getLastGame(requestUrl: string) {
    const body = await this.doRquest(requestUrl)
    const lastGame: number = body.numero
    return lastGame
  }
}
