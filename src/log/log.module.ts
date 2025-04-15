import { Module } from '@nestjs/common';
import { LogGateway } from './log.gateway';

@Module({
  providers: [LogGateway],
  exports: [LogGateway], // 很重要！
})
export class LogModule {}
