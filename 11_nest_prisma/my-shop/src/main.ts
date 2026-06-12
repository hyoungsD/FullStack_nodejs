import 'dotenv/config'; // from .env를 읽어서 환경변수를 process.env에 넣어줍니다
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationTypes } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Prisma 기초(쇼핑몰) 시작 http://localhost:${process.env.PORT}`);
}
bootstrap();
