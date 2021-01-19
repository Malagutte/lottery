import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/models/task.model';
import { modelToDto } from 'src/serialization/task.serialization';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

    async getTask(task_id: string) {
        const taskModel = await this.taskRepository.findOne({ where: { id: task_id } })

        return modelToDto(taskModel)
    }
}