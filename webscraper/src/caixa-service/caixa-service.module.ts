import { Module } from '@nestjs/common';
import { CaixaWebRequestModule } from '../caixa-web-request/caixa-web-request.module';
import { CaixaServiceHandlerService } from './caixa-service-handler.service';

@Module({
  imports: [CaixaWebRequestModule],
  controllers: [],
  providers: [CaixaServiceHandlerService],
  exports: [CaixaServiceHandlerService],
})
export class CaixaServiceModule {}
