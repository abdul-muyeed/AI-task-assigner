import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './configs/default.config';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './configs/logger.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  const PORT = configService.getOrThrow<number>('PORT');
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  

  await app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

}
bootstrap();
