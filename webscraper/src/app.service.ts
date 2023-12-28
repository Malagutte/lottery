import { Injectable } from '@nestjs/common';
import { WebRequestService } from './web-request/web-request.service';

@Injectable()
export class AppService {
    constructor(private readonly WebRequestService: WebRequestService) {
    }

    run() {
        this.WebRequestService.getGameResultByTypeAndNumber({ type: "megasena", number: "1" });
    }
}
