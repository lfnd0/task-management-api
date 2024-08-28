import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateTaskUseCase } from 'src/app/domains/tasks/use-cases/create-task-usecase';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation.pipe';
import { AuthGuardProvider } from 'src/infra/providers/auth-guard.provider';
import {
  createTaskSchema,
  CreateTaskSchemaDTO,
} from '../schemas/create-task.schema';

@Controller('/tasks')
export class TaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  @UseGuards(AuthGuardProvider)
  @UsePipes(new ZodValidationPipe(createTaskSchema))
  async createNewTask(
    @Request() request: any,
    @Body() taskData: CreateTaskSchemaDTO,
  ): Promise<void> {
    try {
      await this.createTaskUseCase.execute({
        ...taskData,
        userId: request.user.sub,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
