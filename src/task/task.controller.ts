import { Controller, Get, HttpStatus, Logger, Param,Res } from '@nestjs/common'
import { Response } from "express"
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import TaksDto from 'src/dto/task.dto'
import { TaskService } from './task.service'

@ApiTags(`task`)
@Controller('/api/v1/task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get('/:id')
    @ApiResponse({ status: 200, type: TaksDto })
    @ApiResponse({ status: 204 })
    @ApiResponse({ status: 500, description: `Error` })
    getTask(@Param('id') id: string, @Res() res : Response) {
        this.taskService.getTask(id)
        .then((result) => {
            res.json(result).status(HttpStatus.OK)
        })
        .catch((error) => {
            Logger.error(error)
            res.json(error).status(HttpStatus.INTERNAL_SERVER_ERROR).send()
        })

        
    }
}