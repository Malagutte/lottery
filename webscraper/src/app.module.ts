import { Module } from '@nestjs/common';
import { WebRequestModule } from './web-request/web-request.module';

@Module({
  imports: [WebRequestModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
