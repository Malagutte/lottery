import { Module } from '@nestjs/common';
import { WebRequestService } from './web-request.service';

@Module({
  providers: [WebRequestService]
})
export class WebRequestModule { }
