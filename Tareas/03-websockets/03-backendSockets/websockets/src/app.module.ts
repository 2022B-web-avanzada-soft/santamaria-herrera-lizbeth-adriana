import { Module } from '@nestjs/common';
import {EventosModule} from "./eventos/eventos.module";
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EventosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
