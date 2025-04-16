import { Injectable } from '@nestjs/common';
import { LogGateway } from '../log/log.gateway';
import { spawn } from 'child_process';
import * as path from 'path';

@Injectable()
export class SocketdlService {
    constructor(private readonly logGateway: LogGateway) {}

    // yt-dlp --output "%(uploader)s_%(upload_date)s_%(id)s.%(ext)s"
    //  --merge-output-format mp4 --embed-thumbnail "https://youtu.be/kzZ6KXDM1RI?si=3gg0ytB1XQO8lh_W"
    // yt-dlp --output "%(uploader)s_%(upload_date)s_%(id)s.%(ext)s" --merge-output-format mp4 --embed-thumbnail "https://youtu.be/kzZ6KXDM1RI?si=3gg0ytB1XQO8lh_W"

    async runYtDlp(taskId:string, url: string, format: string = 'mp4'){
            const strFormat = format === 'mp3' ? `--extract-audio --audio-format` : `--merge-output-format`;
            const fileName = `%(id)s.%(ext)s`;
            const outputPath = path.join(__dirname, '..', '..', 'downloads', fileName);
            console.log(`fileName:${fileName}  outputPath:${outputPath}`);
            const args = ['--output', outputPath, strFormat, format, '--embed-thumbnail', url];
            console.log(`args:${args} `);
            const ytDlp = spawn('yt-dlp', args);
        
            ytDlp.stdout.on('data', (data) => {
                if(data.toString().indexOf(`ytserv/downloads`) == -1){
                    this.logGateway.sendLog(taskId, data.toString());
                }
                else{
                    
                }
            });
        
            ytDlp.stderr.on('data', (data) => {
                this.logGateway.sendLog(taskId, `[W] ${data.toString()}`);
            });
            
            ytDlp.on('close', (code) => {
                this.logGateway.sendLog(taskId, `Process exited with code ${code}`);
                this.logGateway.disconnect(taskId, '');
            });
          
            ytDlp.on('error', (err) => {
                this.logGateway.sendLog(taskId, `Spawn error: ${err.message}`);
                this.logGateway.errorDisconnect(taskId);
            });
            
        }
}
