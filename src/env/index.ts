import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const env = {
  PORT: configService.get<number>('PORT'),
  JWT_SECRET: configService.get<string>('JWT_SECRET'),
};
