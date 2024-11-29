import { Test, TestingModule } from '@nestjs/testing';
import { SavingOptionService } from './saving-option.service';

describe('SavingOptionService', () => {
  let service: SavingOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavingOptionService],
    }).compile();

    service = module.get<SavingOptionService>(SavingOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
