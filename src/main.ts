import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 提供下載的檔案靜態服務
  app.use('/downloads', express.static(path.join(__dirname, '..', 'downloads')));
  app.useGlobalPipes(new ValidationPipe()); // 這行非常重要

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
