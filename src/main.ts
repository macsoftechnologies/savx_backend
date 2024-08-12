import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import * as express from 'express';
import { join } from 'path';

import * as basicAuth from 'express-basic-auth';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200'],
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(express.static(join(process.cwd(), './public/')));

  app.use(
    // ['/docs', '/docs-json'],
    ['/api/v1'],
    basicAuth({
      challenge: true,
      users: {
        swagger: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Sav-x API')
    .setDescription('Sav-x API description')
    .setVersion('0.1.1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1', app, document);
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT;
  await app.listen(PORT);
  console.log(
    `App started at ${new Date()} on port ${PORT} in ${
      process.env.APP_ENV
    } environment`,
  );
}
bootstrap();
