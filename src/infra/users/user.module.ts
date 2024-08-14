import { Module } from '@nestjs/common';
import { IUserRepository } from 'src/app/domains/users/repositories/user.repository';
import { CreateUserUseCase } from 'src/app/domains/users/use-cases/create-user.usecase';
import { PrismaService } from '../database/prima.service';
import { UserController } from './controllers/user.controller';
import { UserPrismaRepository } from './repositories/user-prisma.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
