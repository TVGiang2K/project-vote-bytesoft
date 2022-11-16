import { Test, TestingModule } from '@nestjs/testing';
import { YController } from './y.controller';
import { YService } from './y.service';

describe('YController', () => {
  let controller: YController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YController],
      providers: [YService],
    }).compile();

    controller = module.get<YController>(YController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
