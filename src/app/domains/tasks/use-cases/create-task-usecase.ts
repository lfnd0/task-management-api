import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from '../dtos/task.dto';
import { ITaskRepository } from '../repositories/task.repository';

@Injectable()
export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskData: CreateTaskDTO) {
    const { userId, title, description, status, priority, start_at, end_at } =
      taskData;

    await this.taskRepository.createNewTask({
      userId,
      title,
      description,
      status,
      priority,
      start_at,
      end_at,
    });
  }
}
