import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CaixaServiceModule } from './caixa-service/caixa-service.module';

@Module({
  imports: [CaixaServiceModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
