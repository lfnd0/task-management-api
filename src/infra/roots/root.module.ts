import { Module } from '@nestjs/common';
import { RootController } from './controllers/root.controller';

@Module({
  imports: [],
  controllers: [RootController],
  providers: [],
})
export class RootModule {}
