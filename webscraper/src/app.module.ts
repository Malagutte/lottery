import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { WebRequestModule } from './web-request/web-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    WebRequestModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
