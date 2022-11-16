import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YService } from './y.service';
import { CreateYDto } from './dto/create-y.dto';
import { UpdateYDto } from './dto/update-y.dto';

@Controller('y')
export class YController {
  constructor(private readonly yService: YService) {}

  @Post()
  create(@Body() createYDto: CreateYDto) {
    return this.yService.create(createYDto);
  }

  @Get()
  findAll() {
    return this.yService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateYDto: UpdateYDto) {
    return this.yService.update(+id, updateYDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yService.remove(+id);
  }
}
