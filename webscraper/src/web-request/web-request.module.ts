import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WebRequestService } from './web-request.service';
import { Agent } from 'https';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [HttpModule.registerAsync({
    useFactory: async (configService: ConfigService) => (
      {
        baseURL: 'https://servicebus2.caixa.gov.br/portaldeloterias/api',
        httpsAgent: new Agent({
          rejectUnauthorized: false,
        })
      }
    )
  })],
  providers: [WebRequestService],
  exports: [WebRequestService]
})
export class WebRequestModule { }
