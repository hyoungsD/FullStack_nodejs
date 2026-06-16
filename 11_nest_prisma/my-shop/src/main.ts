import 'dotenv/config'; // from .env를 읽어서 환경변수를 process.env에 넣어줍니다
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationTypes } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));

  // Swagger 전역 설정
  const config = new DocumentBuilder()
    .setTitle('쇼핑몰 API')
    .setDescription('11장 - 분류/상품 CRUD')
    .setVersion('1.0')
    .build();
    SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));
  // SeaggerModule.createDocument
  // Nest app에 등록된 모든 모듈과 컨트롤러 라우터를 훑는다
  // DTO에 @ApiProperty, 컨트롤러 @ApiTags를 읽어
  // Open API 스택으로 반환
  
  // SwaggerModule.setup
  // docs : http://localhost:3000/docs 문서로 접속하면 스웨거 문서
  // app : Nest Js Express app

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Prisma 기초(쇼핑몰) 시작 http://localhost:${process.env.PORT}`);
}
bootstrap();
