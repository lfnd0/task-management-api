import { PrismaService } from 'src/infra/database/prima.service';

export type CreateUserDTO = {
  name: string;
  username: string;
  email: string;
  password: string;
};

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

    await this.prismaService.user.create({
      data: {
        name,
        username,
        email,
        password_hash: password,
      },
    });
  }
}
