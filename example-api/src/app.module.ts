import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamplesController } from './examples/examples.controller';

@Module({
  imports: [],
  controllers: [AppController, ExamplesController],
  providers: [AppService],
})
export class AppModule {}
