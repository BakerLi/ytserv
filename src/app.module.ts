import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DownloadsModule } from './downloads/downloads.module';
import { SocketdlModule } from './socketdl/socketdl.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [DownloadsModule, SocketdlModule, LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
