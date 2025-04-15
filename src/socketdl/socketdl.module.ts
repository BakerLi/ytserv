import { Module } from '@nestjs/common';
import { SocketdlController } from './socketdl.controller';
import { SocketdlService } from './socketdl.service';
import { LogModule } from '../log/log.module';

@Module({
  imports: [LogModule], // 導入包含 LogGateway 的 module
  controllers: [SocketdlController],
  providers: [SocketdlService]
})
export class SocketdlModule {}
