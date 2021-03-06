import {
  Context,
  APIGatewayProxyEvent
} from 'aws-lambda';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { createServer, proxy } from 'aws-serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Server } from 'http';

let cachedServer: Server;


const bootstrapServer = async () => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter)
  await app.init();
  return createServer(expressApp);
};

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log("event:");
  console.log(event);

  // Lambda Cold start: if warm, use cached server
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
};