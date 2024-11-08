import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
const port = process.env.PORT || 3005;


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(bodyParser.json({ limit: '100000mb' }));
  app.use(bodyParser.urlencoded({ limit: '100000mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle('Business Management')
    .setDescription('Application to manage your enterprise')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();