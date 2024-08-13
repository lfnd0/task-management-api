import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/app/domains/users/dtos/user.dto';
import { CreateUserUseCase } from 'src/app/domains/users/use-cases/create-user-use-case';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async postUser(@Body() userData: CreateUserDTO) {
    try {
      await this.createUserUseCase.execute(userData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
