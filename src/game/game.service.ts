import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from '../models/game.model';
import { Task, TaskDocument } from '../models/task.model';
import {
  modelToDto,
  responseToModel,
} from '../serialization/game.serialization';
import { modelToDto as modelToDtoTask } from '../serialization/task.serialization';
import Search from './dto/request/search.request';
import SearchResponseDto from './dto/response/search.dto.response';
import * as toCamelCase from 'camelcase';
const requestp = require('request-promise');

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async getGameByTypeAndNumber(type: string, gameNumber: number) {
    const result = await this.gameModel
      .findOne({ type: type, number: gameNumber })
      .exec();

    if (result == null) {
      throw new HttpException(null, HttpStatus.NO_CONTENT);
    }

    return modelToDto(result);
  }

  async updateInformation() {
    const task = new Task();
    task.initDate = new Date();

    const savedTask = new this.taskModel(task);

    await savedTask.save();

    this.processUpdate(savedTask);

    return modelToDtoTask(savedTask);
  }

  private async processUpdate(openTask: Task) {
    const typesForRequest: { type: string; urlParameters: string }[] = [
      {
        type: 'megasena',
        urlParameters:
          'megasena/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbwMPI0sDBxNXAOMwrzCjA0sjIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wNnUwNHfxcnSwBgIDUyhCvA5EawAjxsKckMjDDI9FQE-F4ca/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_HGK818G0KO6H80AU71KG7J0072/res/id=buscaResultado',
      },
      {
        type: 'lotofacil',
        urlParameters:
          'lotofacil/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbz8vTxNDRy9_Y2NQ13CDA0sTIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wBmoxN_FydLAGAgNTKEK8DkRrACPGwpyQyMMMj0VAcySpRM!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_61L0H0G0J0VSC0AC4GLFAD2003/res/id=buscaResultado',
      },
      {
        type: 'quina',
        urlParameters:
          'quina/!ut/p/a1/jc69DoIwAATgZ_EJepS2wFgoaUswsojYxXQyTfgbjM9vNS4Oordd8l1yxJGBuNnfw9XfwjL78dmduIikhYFGA0tzSFZ3tG_6FCmP4BxBpaVhWQuA5RRWlUZlxR6w4r89vkTi1_5E3CfRXcUhD6osEAHA32Dr4gtsfFin44Bgdw9WWSwj/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_61L0H0G0J0VSC0AC4GLFAD20G6/res/id=buscaResultado',
      },
    ];

    const allAsyncUpdateProcess = typesForRequest.map(async (requestType) => {
      const baseUrl = `http://loterias.caixa.gov.br/wps/portal/loterias/landing/${requestType.urlParameters}`;
      const lastGame = await this.getLastGame(baseUrl);

      for (let index = lastGame; index > 0; index--) {
        try {
          const result = await this.gameModel
            .find({ type: requestType.type.toUpperCase(), number: index })
            .exec();

          if (result.length > 0) {
            continue;
          }

          const requestUrl = `${baseUrl}/p=concurso=${index}`;

          const body = await this.doRquest(requestUrl);

          const game = responseToModel(body);
          game.type = requestType.type.toUpperCase();

          const newGame = new this.gameModel(game);
          await newGame.save();

          Logger.log(`Saved game ${game.type} - ${game.number}`);
        } catch (error) {
          Logger.error(
            `Error to save game ${requestType.type.toLowerCase()} - ${index}`,
          );
          Logger.error(JSON.stringify(error));
        }
      }
    });

    await Promise.all(allAsyncUpdateProcess);

    Logger.log(`==================End update process============`);

    this.closeTask(openTask);
  }

  async search(request: Search) {
    if (request.page == null) request.page = 0;

    if (request.amount == null) request.amount = 10;

    const results = await this.gameModel
      .find(this.buildWhere(request))
      .select(this.buildSelect(request))
      .skip(request.page)
      .limit(request.amount)
      .sort({ number: request.order })
      .exec();

    const games = results.map((result) => modelToDto(result));
    const response = new SearchResponseDto();

    response.games = games;
    response.amount = games.length;
    response.page = request.page;

    return response;
  }

  private buildSelect(request: Search): any {
    return request.fields
      ? request.fields.map((field) => {
          if (field.includes('id')) {
            return field;
          }
          const splitFields = field
            .split('.')
            .map((subField) => toCamelCase(subField));

          return splitFields.join('.');
        })
      : null;
  }

  private buildWhere(request: Search) {
    const whereObj = {};

    if (request.types != null)
      Object.assign(whereObj, { type: { $in: request.types } });

    if (request.from != null && request.to != null)
      Object.assign(whereObj, {
        date: { $gte: request.from, $lte: request.to },
      });
    else if (request.from != null)
      Object.assign(whereObj, { date: { $gte: request.from } });
    else Object.assign(whereObj, { date: { $lte: request.to } });

    return whereObj;
  }

  private closeTask(task: Task) {
    if (task.isClosed) {
      return;
    }

    task.endDate = new Date();
    task.isClosed = true;
    const savedTask = new this.taskModel(task);
    savedTask.save();
  }

  private async doRquest(requestUrl: string) {
    const body = await requestp({
      method: 'GET',
      uri: requestUrl,
      jar: true,
    });

    return JSON.parse(body);
  }

  private async getLastGame(requestUrl: string) {
    const body = await this.doRquest(requestUrl);
    const lastGame: number = body.numero;
    return lastGame;
  }
}
