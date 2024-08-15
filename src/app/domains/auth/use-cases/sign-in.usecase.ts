import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/infra/database/prima.service';
import { SignInDTO } from '../dtos/sign-in.dto';

@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async execute(signInData: SignInDTO) {
    const { username, password } = signInData;

    const hasUser = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });

    if (hasUser) {
      const isPasswordValid = await compare(password, hasUser.password_hash);

      if (isPasswordValid) {
        const payload = {
          sub: hasUser.id,
          username: hasUser.username,
        };

        const token = await this.jwtService.signAsync(payload);

        return {
          accessToken: token,
        };
      }

      throw new UnauthorizedException();
    }

    throw new UnauthorizedException();
  }
}
