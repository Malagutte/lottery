import { Controller, Get, Param } from '@nestjs/common'
import { TaskService } from './task.service'

@Controller('/api/v1/task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get('/:id')
    getTask(@Param('id') id: string) {
        return { text: this.taskService.getTask(id) }
    }
}