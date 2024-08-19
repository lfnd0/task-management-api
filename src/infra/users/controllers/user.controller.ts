import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/app/domains/users/dtos/user.dto';
import { CreateUserUseCase } from 'src/app/domains/users/use-cases/create-user.usecase';
import { AuthGuardProvider } from 'src/infra/providers/auth-guard.provider';
import { CreateUserValidationPipe } from '../pipes/create-user-validation.pipe';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async postUser(@Body() userData: CreateUserDTO) {
    try {
      await this.createUserUseCase.execute(userData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/profile')
  @UseGuards(AuthGuardProvider)
  async getUser() {
    return { message: 'ok' };
  }
}
