import { Test, TestingModule } from '@nestjs/testing';
import { DailySavingsService } from './daily-savings.service';

describe('DailySavingsService', () => {
  let service: DailySavingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailySavingsService],
    }).compile();

    service = module.get<DailySavingsService>(DailySavingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
