import { CreateTaskDTO } from '../dtos/task.dto';

export abstract class ITaskRepository {
  abstract createNewTask(taskData: CreateTaskDTO): Promise<void>;
}
