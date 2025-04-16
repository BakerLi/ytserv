import { IsIn, IsOptional, IsString, isString, IsUrl } from 'class-validator';

export class DownloadQueryDto {
  @IsOptional()
  token?: string; // 可用來驗證使用者、授權等

  @IsString()
  id:string;
}

export class DownloadBodyDto {
  @IsUrl()
  url: string;


  @IsOptional()
  @IsIn(['mp4', 'mp3'])
  format?: string;
}
