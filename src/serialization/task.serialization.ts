import { TaskDto } from '../dto/task.dto';
import { TaskDocument } from '../models/task.model';

export const modelToDto = (task: TaskDocument) => {
  const dto = new TaskDto();

  dto.id = task.id;
  dto.endDate = task.endDate;
  dto.initDate = task.initDate;
  dto.isClosed = task.isClosed;

  return dto;
};
