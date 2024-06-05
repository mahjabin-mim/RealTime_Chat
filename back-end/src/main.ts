import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow requests from your Next.js app
    methods: '*',
    credentials: true, // Enable credentials (if needed)
  });
  await app.listen(8000);
}
bootstrap();
