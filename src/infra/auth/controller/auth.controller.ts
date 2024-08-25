import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { SignInUseCase } from 'src/app/domains/auth/use-cases/sign-in.usecase';
import { ZodValidationPipe } from 'src/infra/pipes/zod-validation.pipe';
import { signInSchema, SignInSchemaDTO } from '../schemas/sign-in.schema';

@Controller()
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('/sign-in')
  @UsePipes(new ZodValidationPipe(signInSchema))
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInData: SignInSchemaDTO) {
    try {
      const { accessToken } = await this.signInUseCase.execute(signInData);
      return { accessToken };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
