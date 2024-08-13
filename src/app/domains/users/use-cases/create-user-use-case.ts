import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/infra/database/prima.service';
import { CreateUserDTO } from '../dtos/user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(private prismaService: PrismaService) {}

  async execute(userData: CreateUserDTO) {
    const { username, name, email, password } = userData;

    const hasUser = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });

    if (hasUser) {
      throw new Error('user already exists');
    }

    const passwordHashed = await hash(password, 10);

    await this.prismaService.user.create({
      data: {
        name,
        username,
        email,
        password_hash: passwordHashed,
      },
    });
  }
}
