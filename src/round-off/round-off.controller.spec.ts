import { Test, TestingModule } from '@nestjs/testing';
import { RoundOffController } from './round-off.controller';

describe('RoundOffController', () => {
  let controller: RoundOffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoundOffController],
    }).compile();

    controller = module.get<RoundOffController>(RoundOffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
