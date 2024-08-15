import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SignInUseCase } from 'src/app/domains/auth/use-cases/sign-in.usecase';
import { PrismaService } from '../database/prima.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, SignInUseCase],
})
export class AuthModule {}
