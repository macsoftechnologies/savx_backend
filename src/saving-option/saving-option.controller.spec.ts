import { Test, TestingModule } from '@nestjs/testing';
import { SavingOptionController } from './saving-option.controller';

describe('SavingOptionController', () => {
  let controller: SavingOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavingOptionController],
    }).compile();

    controller = module.get<SavingOptionController>(SavingOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
