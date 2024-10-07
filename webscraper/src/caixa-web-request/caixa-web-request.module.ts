import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Agent } from 'https';
import { CaixaWebRequestService } from './caixa-web-request.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async () => ({
        baseURL: 'https://servicebus2.caixa.gov.br/portaldeloterias/api',
        httpsAgent: new Agent({
          rejectUnauthorized: false,
        }),
      }),
    }),
  ],
  providers: [CaixaWebRequestService],
  exports: [CaixaWebRequestService],
})
export class CaixaWebRequestModule {}
