import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
    getTask(task_id: string): string {
        return "task hello";
    }
}