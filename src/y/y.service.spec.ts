import { Test, TestingModule } from '@nestjs/testing';
import { YService } from './y.service';

describe('YService', () => {
  let service: YService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YService],
    }).compile();

    service = module.get<YService>(YService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
