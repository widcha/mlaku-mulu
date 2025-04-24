import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mlaku Mulu API')
    .setDescription('Mlaku Mulu API description')
    .setVersion('0.1')
    .addServer('http://localhost:3000', 'Local environment')
    .addServer('https://staging.yourapi.com/', 'Staging')
    .addServer('https://production.yourapi.com/', 'Production')
    .addTag('mlaku-mulu')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payload to DTO instances
      validationError: { target: false }, // Don't include the target object in error messages
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
