import { Injectable } from '@nestjs/common';
import { CaixaServiceHandlerService } from './caixa-service/caixa-service-handler.service';

@Injectable()
export class AppService {
  constructor(private readonly caixaHandler: CaixaServiceHandlerService) {}

  async run() {
    this.caixaHandler.run();
  }
}
