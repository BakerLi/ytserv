import { Controller, Post, Body } from '@nestjs/common';
import { SocketdlService } from './socketdl.service';
import { SocketdlBodyDto } from './socketdl.dto';

@Controller('socketdl')
export class SocketdlController {
    constructor(private readonly socketdlService: SocketdlService) {}
    
    @Post()
    async startDownload(@Body() body: SocketdlBodyDto) {
        const { url, format } = body;
        const taskId = url; // 使用 URL 作為簡單的 taskId，也可以考慮使用 UUID
        this.socketdlService.runYtDlp(taskId, url, format);
        return { status: 'started', url, taskId, format};
      }

}
