import { Injectable, Logger } from '@nestjs/common';
import { CaixaWebRequestService } from '../caixa-web-request/caixa-web-request.service';
import { Timer } from '../app.timmer';

@Injectable()
export class CaixaServiceHandlerService {
  constructor(private readonly webRequest: CaixaWebRequestService) {}

  async run() {
    const types = ['megasena'];

    for (const type of types) {
      const timer = new Timer();

      Logger.log(`Starting scrapping for ${type}`);
      await this.executeScrappingByGameType(type);
      Logger.log(timer.end(`Scrapping for ${type}`));
    }
  }

  private async executeScrappingByGameType(type: string) {
    const { lastGameSaved, lastGame } = await this.getLastGameToInteract(type);

    for (let i = lastGameSaved; i <= lastGame; i++) {
      await this.scrappingGameData(type, i.toString());
      //TODO CONVERT DATA AND SEND TO API DOMAIN TO SAVE
    }
  }

  private async scrappingGameData(type: string, number?: string) {
    const timer = new Timer();
    let response = null;

    try {
      response = this.webRequest.getGameResultByTypeAndNumber({
        type,
        number,
      });
    } catch (e) {
      Logger.error(e);
    }

    Logger.debug(timer.end(`Game ${type}-${number ?? response.numero}`));

    return response;
  }

  private async getLastGameToInteract(type: string) {
    //TODO GET LAST GAME SAVED OR GET LAST GAME FROM API DOMAIN
    const lastGameSaved = 1;
    const { numero: lastGame } =
      await this.webRequest.getGameResultByTypeAndNumber({
        type,
      });

    return { lastGameSaved, lastGame };
  }
}
