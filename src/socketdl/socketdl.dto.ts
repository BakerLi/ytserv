import { IsIn, IsOptional, IsUrl } from 'class-validator';

export class SocketdlQueryDto {
  @IsOptional()
  token?: string; // 可用來驗證使用者、授權等
}

export class SocketdlBodyDto {
  @IsUrl()
  url: string;

  @IsOptional()
  @IsIn(['mp4', 'mp3'])
  format?: string;
}
