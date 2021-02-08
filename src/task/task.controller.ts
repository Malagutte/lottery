import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { modelToDto } from '../serialization/task.serialization';
import { TaskDto } from '../dto/task.dto';
import { TaskService } from './task.service';

@ApiTags(`task`)
@Controller('/api/v1/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, type: TaskDto })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 500, description: `Error` })
  getTask(@Param('id') id: string) {
    return this.taskService.getTask(id).then((result) => {
      if (result == null) {
        throw new HttpException(null, HttpStatus.NO_CONTENT);
      }
      return modelToDto(result);
    });
  }
}
