import { TaskDto } from "src/dto/task.dto";
import { Task } from "src/models/task.model";


export const modelToDto = (task: Task) => {

    const dto = new TaskDto()

    dto.id = task.id
    dto.endDate = task.endDate
    dto.initDate = task.initDate
    dto.isClosed = task.isClosed

    return dto

}