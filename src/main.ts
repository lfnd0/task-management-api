import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = env.PORT;
  await app.listen(port!, () => {
    console.info(`Server is running on: http://localhost:${port}`);
  });
}

bootstrap();
