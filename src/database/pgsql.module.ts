import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Award } from 'src/models/award.model';
import { Game } from 'src/models/game.model';
import { GameNumber } from 'src/models/gameNumber.model';
import { Task } from 'src/models/task.model';
import configuration from '../config/env.config';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot(configuration())],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_SCHEMA_NAME'),
        entities: [Game, Award, GameNumber, Task],
        migrations: ['./migrations/*migration{.ts,.js}'],
        synchronize: JSON.parse(configService.get('DB_SYNCHRONIZE_ENABLE')),
        logging: JSON.parse(configService.get('DB_LOGGIN_ENABLE')),
        ssl: JSON.parse(configService.get('DB_SSL_ENABLE')),
        extra: JSON.parse(configService.get('TYPE_ORM_CONFIG_EXTRA'))
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PgSqlModule {

}