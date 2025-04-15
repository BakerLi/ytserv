import { Injectable } from '@nestjs/common';
import { LogGateway } from '../log/log.gateway';
import { spawn } from 'child_process';
import * as path from 'path';

@Injectable()
export class SocketdlService {
    constructor(private readonly logGateway: LogGateway) {}

    async runYtDlp(taskId:string, url: string, format?: string){
            const timestamp = Date.now();
            const ext = format === 'mp3' ? 'mp3' : 'mp4';
            const fileName = `${timestamp}.${ext}`;
            const outputPath = path.join(__dirname, '..', '..', 'downloads', fileName);
            console.log(`fileName:${fileName}  outputPath:${outputPath}`);
            const args = ['-f', 'best', '-o', outputPath, url];
            if (format === 'mp3') {
                args.unshift('--extract-audio', '--audio-format', 'mp3');
            }
            console.log(`args:${args} `);
            const ytDlp = spawn('yt-dlp', args);
        
            ytDlp.stdout.on('data', (data) => {
                if(data.toString().indexOf('Destination') == -1){
                    this.logGateway.sendLog(taskId, data.toString());
                }
                
            });
        
            ytDlp.stderr.on('data', (data) => {
                this.logGateway.sendLog(taskId, `[W] ${data.toString()}`);
            });
            
            ytDlp.on('close', (code) => {
                this.logGateway.sendLog(taskId, `Process exited with code ${code}`);
                this.logGateway.disconnect(taskId);
            });
          
            ytDlp.on('error', (err) => {
                this.logGateway.sendLog(taskId, `Spawn error: ${err.message}`);
                this.logGateway.errorDisconnect(taskId);
            });
        
            
          }
}
