import { ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as cors from '@fastify/cors';

import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';

// import compression from '@fastify/compress';

const CORS_OPTIONS = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  exposedHeaders: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

async function bootstrap() {
  const adapter = new FastifyAdapter();
  adapter.register(cors, CORS_OPTIONS);

  // await adapter.register(compression);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // prisma exception filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(9999, '0.0.0.0');
}
bootstrap();
