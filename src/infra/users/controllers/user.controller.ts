import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/app/domains/users/use-cases/create-user.usecase';
import { UserProfileUseCase } from 'src/app/domains/users/use-cases/user-profile.usecase';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation.pipe';
import { AuthGuardProvider } from 'src/infra/providers/auth-guard.provider';
import {
  createUserSchema,
  CreateUserSchemaDTO,
} from '../schemas/create-user.schema';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly userProfileUseCase: UserProfileUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async postUser(@Body() userData: CreateUserSchemaDTO) {
    try {
      await this.createUserUseCase.execute(userData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/profile')
  @UseGuards(AuthGuardProvider)
  async getUserProfile(@Request() request: any) {
    try {
      return this.userProfileUseCase.execute(request.user.sub);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
