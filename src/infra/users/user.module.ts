import { Module } from '@nestjs/common';
import { CreateUserUseCase } from 'src/app/domains/users/use-cases/create-user-use-case';
import { PrismaService } from '../database/prima.service';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, CreateUserUseCase],
})
export class UserModule {}
