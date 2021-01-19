import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/models/task.model';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';


@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([Task])]
})
export class TaskModule {

}