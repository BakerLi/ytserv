import { Controller, Post, Query, Res, HttpException, HttpStatus, Body, Get } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { Response } from 'express';
import * as path from 'path';
import { DownloadBodyDto, DownloadQueryDto } from './download.dto';
import { createReadStream, existsSync } from 'fs';

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
            fullUrl: `https://thxjupiter.ddns.net${downloadUrl}`, // 或你的 domain
        };
        } catch (error) {
            throw new HttpException(`下載失敗: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 直接下載影片
    @Get('directID')
    async downloadDirectByID(@Query() parms: DownloadQueryDto, @Res() res: Response) {
        const { id } = parms;
        const fileName = `${id}.${'mp4'}`;
        const outputPath = path.join(__dirname, '..', '..', 'downloads', fileName);
        console.log(`outputPath ${outputPath}`)
        try {
            if (!existsSync(outputPath)) {
                return res.status(404).json({ message: 'File not found' });
              }
          
              res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
              res.setHeader('Content-Type', 'application/octet-stream');
          
              const fileStream = createReadStream(outputPath);
              fileStream.pipe(res);
        } catch (error) {
            throw new HttpException(`下載失敗: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
