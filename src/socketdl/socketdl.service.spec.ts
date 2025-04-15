import { Test, TestingModule } from '@nestjs/testing';
import { SocketdlService } from './socketdl.service';

describe('SocketdlService', () => {
  let service: SocketdlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketdlService],
    }).compile();

    service = module.get<SocketdlService>(SocketdlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
