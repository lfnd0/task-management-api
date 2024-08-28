import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from 'src/app/domains/tasks/dtos/task.dto';
import { ITaskRepository } from 'src/app/domains/tasks/repositories/task.repository';
import { PrismaService } from 'src/infra/database/prima.service';

@Injectable()
export class TaskPrismaRepository implements ITaskRepository {
  constructor(private prismaService: PrismaService) {}

  async createNewTask(taskData: CreateTaskDTO): Promise<void> {
    const { userId, title, description, status, priority, start_at, end_at } =
      taskData;
    console.log(userId);

    await this.prismaService.taskUser.create({
      data: {
        task: {
          create: {
            title,
            description,
            status,
            priority,
            start_at,
            end_at,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
