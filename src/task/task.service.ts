import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/models/task.model';
import { modelToDto } from 'src/serialization/task.serialization';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }

    async getTask(taskId: string) {
        const taskModel = await this.taskModel.findById(taskId).exec();


        if (taskModel == null) {
            throw new HttpException(null, HttpStatus.NO_CONTENT);
        }
        return modelToDto(taskModel)
    }
}