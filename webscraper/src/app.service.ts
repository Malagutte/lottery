import { Injectable, Logger } from '@nestjs/common';
import { WebRequestService } from './web-request/web-request.service';
import { Timer } from './app.timmer';

@Injectable()
export class AppService {
    constructor(private readonly WebRequestService: WebRequestService) {
    }

    async run() {
        const types = ["megasena"];

        for (const type of types) {
            const timer = new Timer();

            Logger.log(`Starting scrapping for ${type}`);
            await this.executeScrappingByGameType(type);
            Logger.log(timer.end(`Scrapping for ${type}`));
        }
    }

    async executeScrappingByGameType(type: string) {
        const lastGame = 10;
        for (let i = lastGame; i > 0; i--) {
            const timer = new Timer();
            await this.scrappingGameData(type, i.toString());
            Logger.log(timer.end(`Game ${type}-${i}`));
        }
    }

    async scrappingGameData(type: string, number: string) {
        this.WebRequestService.getGameResultByTypeAndNumber({ type, number })
            .then((response) => response)
            .catch((err) => Logger.error(err.message));
    }

}
