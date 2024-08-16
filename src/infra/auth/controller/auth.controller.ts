import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SignInDTO } from 'src/app/domains/auth/dtos/sign-in.dto';
import { SignInUseCase } from 'src/app/domains/auth/use-cases/sign-in.usecase';

@Controller()
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInData: SignInDTO) {
    try {
      const { accessToken } = await this.signInUseCase.execute(signInData);
      return { accessToken };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
