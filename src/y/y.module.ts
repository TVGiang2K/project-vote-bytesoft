import { Module } from '@nestjs/common';
import { YService } from './y.service';
import { YController } from './y.controller';

@Module({
  controllers: [YController],
  providers: [YService]
})
export class YModule {}
