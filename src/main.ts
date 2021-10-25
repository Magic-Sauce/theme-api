import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { themeDb } from './db.connection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Theme Project Api')
    .setDescription('API used for storing and updating themes')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [],
  });
  SwaggerModule.setup(`swagger`, app, document);

  themeDb.load().then((err) => {
    console.log('Theme Database Loaded');
  });

  app.enableCors({ origin: true });

  await app.listen(3000);
}
bootstrap();
