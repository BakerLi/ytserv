import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

@Injectable()
export class DownloadsService {
    async downloadVideo(url: string, format?: string): Promise<string> {
        const timestamp = Date.now();
        const ext = format === 'mp3' ? 'mp3' : 'mp4';
        const fileName = `${timestamp}.${ext}`;
        const outputPath = path.join(__dirname, '..', '..', 'downloads', fileName);
    
        const args = ['-f', 'best', '-o', outputPath, url];
        if (format === 'mp3') {
            args.unshift('--extract-audio', '--audio-format', 'mp3');
        }
        const ytDlp = spawn('yt-dlp', args);
    
        ytDlp.stdout.on('data', (data) => {
          const text = data.toString();
          console.log(`[yt-dlp] ${text}`); // 可以看到進度，例如 [download] 12.3% ...
        });
    
        ytDlp.stderr.on('data', (data) => {
          console.error(`[yt-dlp ERROR] ${data}`);
        });
    
        return new Promise((resolve, reject) => {
          ytDlp.on('close', (code) => {
            if (code === 0) {
              resolve(outputPath);
            } else {
              reject(new Error(`yt-dlp process exited with code ${code}`));
            }
          });
        });
      }
    
      getDownloadUrl(filePath: string): string {
        const fileName = path.basename(filePath);
        return `/downloads/${fileName}`;
      }
}
