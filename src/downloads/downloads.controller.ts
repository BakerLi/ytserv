import { Controller, Post, Query, Res, HttpException, HttpStatus, Body } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { Response } from 'express';
import * as path from 'path';
import { DownloadBodyDto } from './download.dto';

@Controller('downloads')
export class DownloadsController {
    constructor(private readonly downloadsService: DownloadsService) {}

    // 直接下載影片
    @Post('direct')
    async downloadDirect(@Body() body: DownloadBodyDto, @Res() res: Response) {
        const { url, format } = body;

        try {
            const filePath = await this.downloadsService.downloadVideo(url, format);
            return res.download(filePath);
        } catch (error) {
            throw new HttpException(`下載失敗: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('link')
    async downloadWithLink(@Body() body: DownloadBodyDto) {
        const { url, format } = body;

        try {
            const filePath = await this.downloadsService.downloadVideo(url, format);
            const downloadUrl = this.downloadsService.getDownloadUrl(filePath);

        return {
            message: '下載完成',
            downloadUrl: downloadUrl,
            fullUrl: `http://34.66.222.199:3000${downloadUrl}`, // 或你的 domain
        };
        } catch (error) {
            throw new HttpException(`下載失敗: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
