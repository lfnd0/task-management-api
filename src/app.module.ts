import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infra/auth/auth.module';
import { RootModule } from './infra/roots/root.module';
import { UserModule } from './infra/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    RootModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
