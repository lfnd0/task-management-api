import { Injectable } from '@nestjs/common';
import {
  CreateUserDTO,
  UserCreatedDTO,
} from 'src/app/domains/users/dtos/user.dto';
import { IUserRepository } from 'src/app/domains/users/repositories/user.repository';
import { PrismaService } from 'src/infra/database/prima.service';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  findUserByUsername(username: string): Promise<UserCreatedDTO | null> {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findUserByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<UserCreatedDTO | null> {
    return this.prismaService.user.findFirst({
      where: {
        OR: [{ username, email }],
      },
    });
  }

  async createNewUser(data: CreateUserDTO): Promise<void> {
    const { name, username, email, password } = data;

    await this.prismaService.user.create({
      data: {
        name,
        username,
        email,
        password_hash: password,
      },
    });
  }

  async findUserById(
    userId: string,
  ): Promise<{ user: Partial<UserCreatedDTO> } | null> {
    const userData = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (userData) {
      const { id, username, email, name } = userData;

      return {
        user: {
          id,
          username,
          email,
          name,
        },
      };
    }

    return null;
  }
}
