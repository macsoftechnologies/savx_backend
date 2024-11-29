import { Test, TestingModule } from '@nestjs/testing';
import { SavingForService } from './saving-for.service';

describe('SavingForService', () => {
  let service: SavingForService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavingForService],
    }).compile();

    service = module.get<SavingForService>(SavingForService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
