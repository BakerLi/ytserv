import { Test, TestingModule } from '@nestjs/testing';
import { SocketdlController } from './socketdl.controller';

describe('SocketdlController', () => {
  let controller: SocketdlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocketdlController],
    }).compile();

    controller = module.get<SocketdlController>(SocketdlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
