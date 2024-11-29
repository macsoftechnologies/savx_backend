import { Test, TestingModule } from '@nestjs/testing';
import { DailySavingsController } from './daily-savings.controller';

describe('DailySavingsController', () => {
  let controller: DailySavingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailySavingsController],
    }).compile();

    controller = module.get<DailySavingsController>(DailySavingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
