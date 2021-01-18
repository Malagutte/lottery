import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from "./config/env.config";
import { PgSqlModule } from './database/pgsql.module';
import { GameModule } from './game/game.module';
import { TaskModule } from './task/task.module';

@Module({
    imports: [
        GameModule,
        TaskModule,
        ConfigModule.forRoot(configuration()),
        PgSqlModule
    ],
})
export class AppModule {
}