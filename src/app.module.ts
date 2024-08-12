import { Module } from '@nestjs/common';
import { RootModule } from './roots/root.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [RootModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
