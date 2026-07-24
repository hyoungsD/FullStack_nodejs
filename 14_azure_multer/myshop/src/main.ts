import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { mkdirSync } from 'fs';
// import { UPLOAD_DIR } from './common/upload.config';

import {config as loadEnv} from 'dotenv';

loadEnv();   // AZURE_STORAGE string 등을 .env에서 가져오기 위해 사용

async function bootstrap() {

  // mkdirSync(UPLOAD_DIR, {recursive: true})  // 디렉토리 밑에 uploads 생성

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
  const config = new DocumentBuilder()
    .setTitle('쇼핑몰 API')
    .setDescription('13장')
    .setVersion('1.0')
    .addBearerAuth()  // 보호 라우트용 테스트 토큰 입력
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
