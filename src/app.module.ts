import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import configuration from "./config/env.config";
import { ResponseInterceptor } from './config/response.interceptor';
import { GameModule } from './game/game.module';
import { TaskModule } from './task/task.module';

@Module({
    imports: [
        GameModule,
        TaskModule,
        ConfigModule.forRoot(configuration())],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor

        }
    ]
})
export class AppModule {
}