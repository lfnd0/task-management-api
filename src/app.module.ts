import { Module } from '@nestjs/common';
import { RootModule } from './infra/roots/root.module';
import { UserModule } from './infra/users/user.module';

@Module({
  imports: [RootModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
