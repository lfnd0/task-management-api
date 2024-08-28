import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITaskRepository } from 'src/app/domains/tasks/repositories/task.repository';
import { CreateTaskUseCase } from 'src/app/domains/tasks/use-cases/create-task-usecase';
import { PrismaService } from '../database/prima.service';
import { TaskController } from './controllers/task.controller';
import { TaskPrismaRepository } from './repositories/task-prisma.repository';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [
    PrismaService,
    JwtService,
    CreateTaskUseCase,
    {
      provide: ITaskRepository,
      useClass: TaskPrismaRepository,
    },
  ],
})
export class TaskModule {}
