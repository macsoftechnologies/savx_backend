import { Test, TestingModule } from '@nestjs/testing';
import { RoundOffService } from './round-off.service';

describe('RoundOffService', () => {
  let service: RoundOffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundOffService],
    }).compile();

    service = module.get<RoundOffService>(RoundOffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
