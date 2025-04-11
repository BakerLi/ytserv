import { IsIn, IsOptional, IsUrl } from 'class-validator';

export class DownloadQueryDto {
  @IsOptional()
  token?: string; // 可用來驗證使用者、授權等
}

export class DownloadBodyDto {
  @IsUrl()
  url: string;

  @IsOptional()
  @IsIn(['mp4', 'mp3'])
  format?: string;
}
