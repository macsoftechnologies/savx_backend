import { Test, TestingModule } from '@nestjs/testing';
import { SavingForController } from './saving-for.controller';

describe('SavingForController', () => {
  let controller: SavingForController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavingForController],
    }).compile();

    controller = module.get<SavingForController>(SavingForController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
