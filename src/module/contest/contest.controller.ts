import { Controller, Get, Post, Body, Patch, Param, Delete,HttpCode,UsePipes,ValidationPipe } from '@nestjs/common';
import { ContestService } from './contest.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @Post()
  @HttpCode(200) 
  @UsePipes(ValidationPipe)
  create(@Body() createContestDto: CreateContestDto) {
    return this.contestService.create(createContestDto);
  }

  @Get('/list')
  findAll() {
    return this.contestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContestDto: UpdateContestDto) {
    return this.contestService.update(+id, updateContestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestService.remove(+id);
  }
}
